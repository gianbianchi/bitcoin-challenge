import { inject, injectable } from 'tsyringe';
import { ITransactionRepository } from '../../domain/transaction/repository/transaction.repository';

export type CreateTransactionDto = {
  amount: number;
  code: 'BRL' | 'BTC';
  transactionType: 'CREDIT' | 'DEBIT';
  userId: string;
};

@injectable()
export class CreateTransactionUseCase {
  constructor(
    @inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository
  ) {}

  async execute(input: CreateTransactionDto): Promise<void> {
    await this.transactionRepository.create({
      amount: input.amount,
      code: input.code,
      transactionType: input.transactionType,
      user: {
        id: input.userId,
      },
    });
  }
}
