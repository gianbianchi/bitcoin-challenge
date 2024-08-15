import express, { Router } from 'express';
import { handleGetBalance } from '../../adapters/controllers/user/get-balance.controller';
import { handleGetUserStatement } from '../../adapters/controllers/user/get-statement.controller';
import { handleGetCoinBalance } from '../../adapters/controllers/user/get-coin-balance.controller';
import { handleGetVolume } from '../../adapters/controllers/user/get-user-volume.controller';

const user = Router();

user.use(express.json());

user.get('/balance', handleGetBalance);
user.get('/balance/btc', handleGetCoinBalance);
user.get('/statement', handleGetUserStatement);
user.get('/volume', handleGetVolume);

export { user };
