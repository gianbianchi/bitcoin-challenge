import { Transaction } from '../model/transaction';

export interface ITransactionRepository {
  create(user: Transaction): Promise<void>;
}
