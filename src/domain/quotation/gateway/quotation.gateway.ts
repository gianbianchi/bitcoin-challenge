import { Quotation } from '../model/quotation';

export interface IQuotationGateway {
  getQuotation(): Promise<Quotation>;
}
