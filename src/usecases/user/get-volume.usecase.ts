import { inject, injectable } from 'tsyringe';
import { ITransactionRepository } from '../../domain/transaction/repository/transaction.repository';
import { startOfDay } from 'date-fns';

type OutputDto = {
  totalValueBoughtToday: number;
  totalValueSoldToday: number;
};

@injectable()
export class GetUserVolumeUseCase {
  constructor(
    @inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository
  ) {}

  async execute(userId: string): Promise<OutputDto> {
    const today = startOfDay(new Date());

    const totalValueBoughtToday =
      (await this.transactionRepository.getUserVolumeByDate(
        userId,
        today,
        'credit'
      )) ?? 0;

    const totalValueSoldToday =
      (await this.transactionRepository.getUserVolumeByDate(
        userId,
        today,
        'debit'
      )) ?? 0;

    return {
      totalValueBoughtToday,
      totalValueSoldToday,
    };
  }
}
