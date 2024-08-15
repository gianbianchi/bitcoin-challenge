import { inject, injectable } from 'tsyringe';
import { IQuotationHistoryRepository } from '../../domain/quotation-history/repository/quotation-history.repository';
import { IQuotationGateway } from '../../domain/quotation/gateway/quotation.gateway';
import { subDays } from 'date-fns';

@injectable()
export class SaveCoinQuotationHistoryUseCase {
  constructor(
    @inject('IQuotationGateway')
    private readonly quotationRequestGateway: IQuotationGateway,
    @inject('IQuotationHistoryRepository')
    private readonly quotationHistoryRepository: IQuotationHistoryRepository
  ) {}

  async execute(): Promise<void> {
    const removeBeforeDate = subDays(new Date(), 90);
    const response = await this.quotationRequestGateway.getQuotation();

    await this.quotationHistoryRepository.purgeDataBeforeDate(removeBeforeDate);
    await this.quotationHistoryRepository.create(response);
  }
}
