import { inject, injectable } from 'tsyringe';
import { IQuotationHistoryRepository } from '../../domain/quotation-history/repository/quotation-history.repository';
import { IQuotationGateway } from '../../domain/quotation/gateway/quotation.gateway';

@injectable()
export class SaveCoinQuotationHistoryUseCase {
  constructor(
    @inject('IQuotationGateway')
    private readonly quotationRequestGateway: IQuotationGateway,
    @inject('IQuotationHistoryRepository')
    private readonly quotationHistoryRepository: IQuotationHistoryRepository
  ) {}

  async execute(): Promise<void> {
    const response = await this.quotationRequestGateway.getQuotation();

    await this.quotationHistoryRepository.create(response);
  }
}
