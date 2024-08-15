import cron from 'node-cron';
import { handleSaveCoinQuotationHistory } from './finance/save-coin-quotation-history.cron';

export const cronScheduler = () => {
  cron.schedule('*/10 * * * *', () => {
    handleSaveCoinQuotationHistory();
  });
};
