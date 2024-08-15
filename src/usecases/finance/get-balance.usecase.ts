import { inject, injectable } from 'tsyringe';
import { ITransactionRepository } from '../../domain/transaction/repository/transaction.repository';

type OutputDto = {
  balance: number;
};

@injectable()
export class GetUserBalanceUseCase {
  constructor(
    @inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository
  ) {}

  async execute(userId: string): Promise<OutputDto> {
    const balance = await this.transactionRepository.getBalance(userId, 'brl');
    return { balance: balance?.total ?? 0 };
  }
}
