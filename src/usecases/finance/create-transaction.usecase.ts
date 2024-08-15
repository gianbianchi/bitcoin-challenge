import { inject, injectable } from 'tsyringe';
import { UseCase } from '../usecase';
import { ITransactionRepository } from '../../domain/transaction/repository/transaction.repository';

type CreateTransactionDto = {
  amount: number;
  code: 'BRL' | 'BTC';
  transactionType: 'CREDIT' | 'DEBIT';
  userId: string;
};

@injectable()
export class CreateTransactionUseCase
  implements UseCase<CreateTransactionDto, any>
{
  constructor(
    @inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository
  ) {}

  async execute(input: CreateTransactionDto): Promise<any> {
    return await this.transactionRepository.create({
      amount: input.amount,
      code: input.code,
      transactionType: input.transactionType,
      user: {
        id: input.userId,
      },
    });
  }
}
