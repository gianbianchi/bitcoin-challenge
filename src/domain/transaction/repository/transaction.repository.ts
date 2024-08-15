import { Transaction } from '../model/transaction';

export interface ITransactionRepository {
  create(user: Transaction): Promise<void>;
  getBalance(
    userId: string,
    coin: string
  ): Promise<{ total: number } | undefined>;
  buyCoin(
    user: any,
    moneyAmount: number,
    coinAmount: number,
    quotation: number
  ): Promise<void>;
  sellCoin(
    user: any,
    moneyAmount: number,
    coinAmount: number,
    quotation: number
  ): Promise<void>;
}
