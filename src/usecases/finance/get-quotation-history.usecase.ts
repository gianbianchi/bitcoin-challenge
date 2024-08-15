import { inject, injectable } from 'tsyringe';
import { IQuotationHistoryRepository } from '../../domain/quotation-history/repository/quotation-history.repository';
import { subDays } from 'date-fns';

type OutputDto = {
  id?: string;
  buyQuotation: number;
  sellQuotation: number;
  createdAt?: Date;
};

@injectable()
export class GetQuotationHistoryUseCase {
  constructor(
    @inject('IQuotationHistoryRepository')
    private readonly quotationHistoryRepository: IQuotationHistoryRepository
  ) {}

  async execute(): Promise<OutputDto[]> {
    const today = new Date();
    const initialDate = subDays(today, 1);

    return await this.quotationHistoryRepository.findAllBetweenDates(
      initialDate,
      today
    );
  }
}
