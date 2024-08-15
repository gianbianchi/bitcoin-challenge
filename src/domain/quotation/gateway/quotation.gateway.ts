import { Quotation } from '../quotation';

export interface IQuotationGateway {
  getQuotation(): Promise<Quotation>;
}
