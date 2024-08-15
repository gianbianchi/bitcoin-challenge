import { inject, injectable } from 'tsyringe';
import { ITransactionRepository } from '../../domain/transaction/repository/transaction.repository';
import { subDays } from 'date-fns';

@injectable()
export class GetUserStatementUseCase {
  constructor(
    @inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository
  ) {}

  async execute(): Promise<any[]> {
    const today = new Date();
    const daysBefore = subDays(new Date(), 90);

    const deposits = await this.transactionRepository.getDeposits(
      daysBefore,
      today
    );

    const getPurchases = await this.transactionRepository.getNegotiations(
      'btc',
      'credit',
      daysBefore,
      today
    );

    const getSales = await this.transactionRepository.getNegotiations(
      'btc',
      'debit',
      daysBefore,
      today
    );

    const statement = [...deposits, ...getPurchases, ...getSales].sort(
      (a, b) => (a.createdAt > b.createdAt ? 1 : -1)
    );

    return statement;
  }
}
