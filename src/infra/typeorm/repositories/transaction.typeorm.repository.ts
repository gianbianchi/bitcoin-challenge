import { inject, injectable } from 'tsyringe';
import { ITransactionRepository } from '../../../domain/transaction/repository/transaction.repository';
import { TransactionEntity } from '../entities/transaction.entity';
import { Between, Repository } from 'typeorm';
import { Transaction } from '../../../domain/transaction/model/transaction';
import { CoinEnum } from '../enum/coin.enum';
import { TransactionTypeEnum } from '../enum/transaction-type.enum';
import { StatementItem } from '../../../domain/statement/model/statement-item';

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

  async getBalance(
    userId: string,
    coin: string
  ): Promise<{ total: number } | undefined> {
    return await this.repository
      .createQueryBuilder('transaction')
      .select(
        "SUM(CASE WHEN transaction.transaction_type = 'credit' THEN transaction.amount " +
          "WHEN transaction.transaction_type = 'debit' THEN -transaction.amount " +
          'ELSE 0 END)',
        'total'
      )
      .where('transaction.user_id = :userId', { userId })
      .andWhere('transaction.code = :coin', { coin })
      .getRawOne<{ total: number } | undefined>();
  }

  async buyCoin(
    user: any,
    moneyAmount: number,
    coinAmount: number,
    quotation: number
  ): Promise<void> {
    await this.repository.manager.transaction(
      async (transactionalEntityManager) => {
        const debitData = this.repository.create({
          amount: moneyAmount,
          code: CoinEnum.BRL,
          transactionType: TransactionTypeEnum.DEBIT,
          user,
          isNegotiation: true,
        });
        const creditData = this.repository.create({
          amount: coinAmount,
          code: CoinEnum.BTC,
          transactionType: TransactionTypeEnum.CREDIT,
          quotation,
          user,
          isNegotiation: true,
        });
        await transactionalEntityManager.save(debitData);
        await transactionalEntityManager.save(creditData);
      }
    );
  }

  async sellCoin(
    user: any,
    moneyAmount: number,
    coinAmount: number,
    quotation: number
  ): Promise<void> {
    await this.repository.manager.transaction(
      async (transactionalEntityManager) => {
        const creditData = this.repository.create({
          amount: moneyAmount,
          code: CoinEnum.BRL,
          transactionType: TransactionTypeEnum.CREDIT,
          user,
          isNegotiation: true,
        });
        const debitData = this.repository.create({
          amount: coinAmount,
          code: CoinEnum.BTC,
          transactionType: TransactionTypeEnum.DEBIT,
          quotation,
          user,
          isNegotiation: true,
        });
        await transactionalEntityManager.save(debitData);
        await transactionalEntityManager.save(creditData);
      }
    );
  }

  async getDeposits(
    initialDate: Date,
    finalDate: Date
  ): Promise<StatementItem[]> {
    const transactions = await this.repository.find({
      where: {
        code: CoinEnum.BRL,
        isNegotiation: false,
        createdAt: Between(initialDate, finalDate),
      },
    });

    return transactions.map((t) => {
      return {
        id: t.id,
        amount: t.amount,
        quotation: t.quotation,
        code: t.code,
        transactionType: t.transactionType,
        user: t.user,
        createdAt: t.createdAt,
      };
    });
  }

  async getNegotiations(
    code: string,
    transactionType: string,
    initialDate: Date,
    finalDate: Date
  ): Promise<StatementItem[]> {
    return await this.repository
      .createQueryBuilder('tb_transaction')
      .select('tb_transaction.*')
      .addSelect(
        'ROUND(tb_transaction.amount * tb_transaction.quotation, 5)',
        'value'
      )
      .where(
        'tb_transaction.code = :code AND tb_transaction.transaction_type = :transactionType',
        { code, transactionType }
      )
      .andWhere(
        'tb_transaction.created_at BETWEEN :initialDate AND :finalDate',
        { initialDate, finalDate }
      )
      .orderBy('tb_transaction.created_at', 'DESC')
      .getRawMany<StatementItem>();
  }
}
