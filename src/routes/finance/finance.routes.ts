import express, { Router } from 'express';
import { handleGetQuotation } from '../../controllers/finance/get-quotation.controller';
import { handleBuyBitCoin } from '../../controllers/finance/buy-bitcoin.controller';
import { handleSellBitCoin } from '../../controllers/finance/sell-bitcoin.controller copy';

const finance = Router();

finance.use(express.json());

finance.get('/btc/quotation', handleGetQuotation);
finance.post('/btc/buy', handleBuyBitCoin);
finance.post('/btc/sell', handleSellBitCoin);

export { finance };
