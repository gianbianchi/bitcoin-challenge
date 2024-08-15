export class Transaction {
  id?: string;
  amount: number;
  code: 'BRL' | 'BTC';
  transactionType: 'CREDIT' | 'DEBIT';
  user: User;
}

class User {
  id: string;
}
