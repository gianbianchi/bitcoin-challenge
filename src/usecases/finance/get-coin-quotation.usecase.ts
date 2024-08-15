import { inject, injectable } from 'tsyringe';
import { IQuotationGateway } from '../../domain/quotation/gateway/quotation.gateway';

type OutputDto = {
  bitCoinBuyValue: number;
  bitCoinSellValue: number;
};

@injectable()
export class GetCoinQuotationUseCase {
  constructor(
    @inject('IQuotationGateway')
    private readonly quotationRequestGateway: IQuotationGateway
  ) {}

  async execute(): Promise<OutputDto> {
    const response = await this.quotationRequestGateway.getQuotation();

    return {
      bitCoinBuyValue: response.buyQuotation,
      bitCoinSellValue: response.sellQuotation,
    };
  }
}
