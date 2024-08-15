import { Repository } from 'typeorm';
import { IQuotationHistoryRepository } from '../../../domain/quotation-history/repository/quotation-history.repository';
import { QuotationHistoryEntity } from '../entities/quotation-history.entity';
import { inject, injectable } from 'tsyringe';
import { QuotationHistory } from '../../../domain/quotation-history/model/quotation-history';

@injectable()
export class QuotationHistoryTypeOrmRepository
  implements IQuotationHistoryRepository
{
  constructor(
    @inject('QuotationHistoryRepository')
    private readonly repository: Repository<QuotationHistoryEntity>
  ) {}

  async create(body: QuotationHistory): Promise<void> {
    const newData = this.repository.create(body);
    await this.repository.save(newData);
  }

  async findAll(): Promise<QuotationHistory[]> {
    throw new Error('Method not implemented.');
  }

  async purgeDataBeforeDate(date: Date): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
