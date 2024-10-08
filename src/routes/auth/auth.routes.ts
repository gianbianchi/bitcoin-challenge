import express, { Router } from 'express';
import { handleLogin } from '../../adapters/controllers/auth/login.controller';
import { handleRegister } from '../../adapters/controllers/auth/register.controller';

const auth = Router();

auth.use(express.json());

auth.post('/register', handleRegister);
auth.post('/login', handleLogin);

export { auth };
