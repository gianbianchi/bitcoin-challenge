import 'dotenv/config';
import 'reflect-metadata';
import './shared/container';
import express from 'express';
import { AppDataSource } from './infra/typeorm/data-source';
import { PORT } from './shared/constants/constants';
import { router } from './routes/index.routes';
import cors from 'cors';
import { cronScheduler } from './adapters/cron/cron-scheduler';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

initializeDataSource();
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: '*',
    methods: 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    allowedHeaders: '*',
  })
);

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(router);

cronScheduler();

function startApplication() {
  app.listen(PORT, () => {
    console.log(`Application listening on port ${PORT}`);
  });
}

function initializeDataSource(attempt: number = 1) {
  const MAX_RETRIES = 5;
  const RETRY_DELAY = 3000;

  AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
      startApplication();
    })
    .catch((err) => {
      console.error(`Error during Data Source initialization (Attempt ${attempt}/${MAX_RETRIES}):`, err);
      if (attempt < MAX_RETRIES) {
        console.log(`Retrying to initialize Data Source in ${RETRY_DELAY / 1000} seconds...`);
        setTimeout(() => initializeDataSource(attempt + 1), RETRY_DELAY);
      } else {
        console.error('Maximum retries reached. Could not initialize Data Source.');
        process.exit(1);
      }
    });
}