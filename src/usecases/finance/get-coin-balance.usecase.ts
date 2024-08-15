import { inject, injectable } from 'tsyringe';
import { UseCase } from '../usecase';
import { ITransactionRepository } from '../../domain/transaction/repository/transaction.repository';

type OutputDto = {
  balance: number;
};

@injectable()
export class GetUserCoinBalanceUseCase implements UseCase<string, OutputDto> {
  constructor(
    @inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository
  ) {}

  async execute(userId: string): Promise<OutputDto> {
    const balance = await this.transactionRepository.getBalance(userId, 'btc');
    return { balance: balance?.total ?? 0 };
  }
}
