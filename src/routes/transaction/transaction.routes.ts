import express, { Router } from 'express';
import { handleDeposit } from '../../controllers/transaction/deposit.controller';

const transaction = Router();

transaction.use(express.json());

transaction.post('/deposit', handleDeposit);

export { transaction };
