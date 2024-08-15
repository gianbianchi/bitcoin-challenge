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

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

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

app.listen(PORT, () => {
  console.log(`Application listening on port ${PORT}`);
});
