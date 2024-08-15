import express, { Router } from 'express';
import { handleGetBalance } from '../../controllers/user/get-balance.controller';

const user = Router();

user.use(express.json());

user.get('/balance', handleGetBalance);

export { user };
