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
}
