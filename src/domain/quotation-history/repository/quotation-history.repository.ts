import { QuotationHistory } from '../model/quotation-history';

export interface IQuotationHistoryRepository {
  create(body: QuotationHistory): Promise<void>;
  findAllBetweenDates(
    initialDate: Date,
    finalDate: Date
  ): Promise<QuotationHistory[]>;
  purgeDataBeforeDate(date: Date): Promise<void>;
}
