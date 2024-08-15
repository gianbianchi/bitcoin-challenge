import express, { Router } from 'express';
import { handleGetQuotation } from '../../controllers/finance/get-quotation.controller';
import { handleBuyBitCoin } from '../../controllers/finance/buy-bitcoin.controller';

const finance = Router();

finance.use(express.json());

finance.get('/btc/quotation', handleGetQuotation);
finance.post('/btc/buy', handleBuyBitCoin);

export { finance };
