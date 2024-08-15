import cron from 'node-cron';
import { handleSaveCoinQuotationHistory } from './finance/save-coin-quotation-history.cron';
import { CRON_HISTORY_TIME } from '../../shared/constants/constants';

export const cronScheduler = () => {
  cron.schedule(CRON_HISTORY_TIME, () => {
    handleSaveCoinQuotationHistory();
  });
};
