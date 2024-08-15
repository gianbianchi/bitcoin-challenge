import express, { Router } from 'express';
import { handleGetQuotation } from '../../adapters/controllers/finance/get-quotation.controller';
import { handleBuyBitCoin } from '../../adapters/controllers/finance/buy-bitcoin.controller';
import { handleSellBitCoin } from '../../adapters/controllers/finance/sell-bitcoin.controller copy';
import { handleGetQuotationHistory } from '../../adapters/controllers/finance/get-quotation-history.controller';

const finance = Router();

finance.use(express.json());

finance.get('/btc/quotation', handleGetQuotation);
finance.get('/btc/quotation/history', handleGetQuotationHistory);
finance.post('/btc/buy', handleBuyBitCoin);
finance.post('/btc/sell', handleSellBitCoin);

export { finance };
