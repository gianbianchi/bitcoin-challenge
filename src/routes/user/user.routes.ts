import express, { Router } from 'express';
import { handleGetBalance } from '../../controllers/user/get-balance.controller';
import { handleGetUserStatement } from '../../controllers/user/get-statement.controller';
import { handleGetCoinBalance } from '../../controllers/user/get-coin-balance.controller';

const user = Router();

user.use(express.json());

user.get('/balance', handleGetBalance);
user.get('/balance/btc', handleGetCoinBalance);
user.get('/statement', handleGetUserStatement);

export { user };
