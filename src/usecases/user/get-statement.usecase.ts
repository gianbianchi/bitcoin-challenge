import { inject, injectable } from 'tsyringe';
import { ITransactionRepository } from '../../domain/transaction/repository/transaction.repository';
import { subDays, endOfDay, startOfDay } from 'date-fns';

type OutputDto = {
  id: string;
  createdAt: Date;
  amount: number;
  quotation?: number;
  coinAmount?: number;
  type: 'deposit' | 'coin purchase' | 'coin sell';
};

@injectable()
export class GetUserStatementUseCase {
  constructor(
    @inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository
  ) {}

  async execute(
    userId: string,
    initialDate: Date | null,
    finalDate: Date | null
  ): Promise<OutputDto[]> {
    if (!initialDate) {
      initialDate = subDays(new Date(), 90);
    }

    if (!finalDate) {
      finalDate = new Date();
    }

    initialDate = startOfDay(initialDate);
    finalDate = endOfDay(finalDate);

    const deposits = await this.transactionRepository.getDeposits(
      userId,
      initialDate,
      finalDate
    );

    const getPurchases = await this.transactionRepository.getNegotiations(
      userId,
      'btc',
      'credit',
      initialDate,
      finalDate
    );

    const getSales = await this.transactionRepository.getNegotiations(
      userId,
      'btc',
      'debit',
      initialDate,
      finalDate
    );

    const depositStatementItem: OutputDto[] = deposits.map((item) => {
      return {
        id: item.id,
        createdAt: item.created_at,
        amount: item.amount,
        type: 'deposit',
      };
    });

    const purchaseStatementItem: OutputDto[] = getPurchases.map((item) => {
      return {
        id: item.id,
        createdAt: item.created_at,
        amount: item.value ?? 0,
        coinAmount: item.amount,
        quotation: item.quotation,
        type: 'coin purchase',
      };
    });

    const saleStatementItem: OutputDto[] = getSales.map((item) => {
      return {
        id: item.id,
        createdAt: item.created_at,
        amount: item.value ?? 0,
        coinAmount: item.amount,
        quotation: item.quotation,
        type: 'coin sell',
      };
    });

    const statement = [
      ...depositStatementItem,
      ...purchaseStatementItem,
      ...saleStatementItem,
    ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return statement;
  }
}
