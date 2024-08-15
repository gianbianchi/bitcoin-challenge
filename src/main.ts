import 'dotenv/config';
import 'reflect-metadata';
import './shared/container';
import express from 'express';
import { Request, Response } from 'express';
import { AppDataSource } from './infra/typeorm/data-source';
import { PORT } from './shared/constants/constants';
import { RegisterAccountUseCase } from './usecases/user-account/register-account.usecase';
import { container } from 'tsyringe';
import { TesetUseCase } from './usecases/user-account/teste.usecase';
import { handleLogin } from './controllers/auth/login.controller';
import { verifyJWT } from './shared/middlewares/jwt-verify';

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

const registerAccountUseCase = container.resolve(RegisterAccountUseCase);
const testeUseCase = container.resolve(TesetUseCase);

const app = express();
app.use(express.json());

app.post('/users', async function (req: Request, res: Response) {
  const { name, email, password } = req.body;
  const users = await registerAccountUseCase.execute({ name, email, password });
  res.json(users);
});

app.post('/auth/login', handleLogin);

app.get('/users', verifyJWT, async function (req: Request, res: Response) {
  const users = await testeUseCase.execute();
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Application listening on port ${PORT}`);
});
