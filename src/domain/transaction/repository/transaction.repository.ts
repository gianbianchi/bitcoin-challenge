import { StatementItem } from '../../statement/model/statement-item';
import { Transaction, User } from '../model/transaction';

export interface ITransactionRepository {
  create(user: Transaction): Promise<void>;
  getBalance(
    userId: string,
    coin: string
  ): Promise<{ total: number } | undefined>;
  buyCoin(
    user: User,
    moneyAmount: number,
    coinAmount: number,
    quotation: number
  ): Promise<void>;
  sellCoin(
    user: User,
    moneyAmount: number,
    coinAmount: number,
    quotation: number
  ): Promise<void>;
  getDeposits(
    userId: string,
    initialDate: Date,
    finalDate: Date
  ): Promise<StatementItem[]>;
  getNegotiations(
    userId: string,
    code: string,
    transactionType: string,
    initialDate: Date,
    finalDate: Date
  ): Promise<StatementItem[]>;
  getUserVolumeByDate(
    userId: string,
    date: Date,
    transactionType: string
  ): Promise<number | null>;
}
