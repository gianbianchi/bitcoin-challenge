import { inject, injectable } from 'tsyringe';
import { ITransactionRepository } from '../../../domain/transaction/repository/transaction.repository';
import { TransactionEntity } from '../entities/transaction.entity';
import { Repository } from 'typeorm';
import { Transaction } from '../../../domain/transaction/model/transaction';
import { CoinEnum } from '../enum/coin.enum';
import { TransactionTypeEnum } from '../enum/transaction-type.enum';

@injectable()
export class TransactionTypeOrmRepository implements ITransactionRepository {
  constructor(
    @inject('TransactionRepository')
    private readonly repository: Repository<TransactionEntity>
  ) {}

  async create(transaction: Transaction): Promise<void> {
    const newData = this.repository.create({
      amount: transaction.amount,
      code: CoinEnum[transaction.code],
      transactionType: TransactionTypeEnum[transaction.transactionType],
      user: transaction.user,
    });
    await this.repository.save(newData);
  }

  async getBalance(userId: string): Promise<{ total: number } | undefined> {
    return await this.repository
      .createQueryBuilder('transaction')
      .select(
        "SUM(CASE WHEN transaction.transaction_type = 'credit' THEN transaction.amount " +
          "WHEN transaction.transaction_type = 'debit' THEN -transaction.amount " +
          'ELSE 0 END)',
        'total'
      )
      .where('transaction.user_id = :userId', { userId })
      .andWhere('transaction.code = :brl', { brl: 'brl' })
      .getRawOne<{ total: number } | undefined>();
  }

  async buyCoin(
    user: any,
    moneyAmount: number,
    coinAmount: number
  ): Promise<void> {
    await this.repository.manager.transaction(
      async (transactionalEntityManager) => {
        const debitData = this.repository.create({
          amount: moneyAmount,
          code: CoinEnum.BRL,
          transactionType: TransactionTypeEnum.DEBIT,
          user,
        });
        const creditData = this.repository.create({
          amount: coinAmount,
          code: CoinEnum.BTC,
          transactionType: TransactionTypeEnum.CREDIT,
          user,
        });
        await transactionalEntityManager.save(debitData);
        await transactionalEntityManager.save(creditData);
      }
    );
  }
}
