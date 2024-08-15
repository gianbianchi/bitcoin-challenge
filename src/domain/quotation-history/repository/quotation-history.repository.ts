import { QuotationHistory } from '../model/quotation-history';

export interface IQuotationHistoryRepository {
  create(body: QuotationHistory): Promise<void>;
  findAll(): Promise<QuotationHistory[]>;
}
