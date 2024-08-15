export class StatementItem {
  id: string;
  amount: number;
  quotation: number;
  value?: number;
  code: string;
  transactionType: string;
  user: User;
  created_at: Date;
}

class User {
  id: string;
}
