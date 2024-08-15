import express, { Router } from 'express';
import { handleDeposit } from '../../adapters/controllers/transaction/deposit.controller';

const transaction = Router();

transaction.use(express.json());

transaction.post('/deposit', handleDeposit);

export { transaction };
