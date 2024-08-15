import 'dotenv/config';
import express from 'express';
import { Request, Response } from 'express';
import { AppDataSource } from './infra/typeorm/data-source';
import { UserTypeOrmRepository } from './infra/typeorm/repositories/user.typeorm.repository';
import { UserEntity } from './infra/typeorm/entities/user.entity';
import { PORT } from './shared/constants/constants';

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

const repo = UserTypeOrmRepository.create(
  AppDataSource.getRepository(UserEntity)
);

const app = express();
app.use(express.json());

// // register routes
app.get('/users/:id', async function (req: Request, res: Response) {
  const { id } = req.params;
  const users = await repo.findById(String(id));
  res.json(users);
});

app.get('/users', async function (req: Request, res: Response) {
  const users = await repo.findAll();
  res.json(users);
});

app.post('/users', async function (req: Request, res: Response) {
  const results = await repo.save();
  return res.send(results);
});

// // start express server
app.listen(PORT, () => {
  console.log(`Application listening on port ${PORT}`);
});
