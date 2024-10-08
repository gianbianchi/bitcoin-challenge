import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { CoinEnum } from '../enum/coin.enum';
import { TransactionTypeEnum } from '../enum/transaction-type.enum';
import { UserEntity } from './user.entity';

@Entity({ name: 'tb_transaction' })
export class TransactionEntity extends AbstractEntity<TransactionEntity> {
  @Column('decimal', { name: 'amount', precision: 27, scale: 18 })
  amount: number;

  @Column('decimal', {
    name: 'quotation',
    precision: 27,
    scale: 18,
    default: 1,
  })
  quotation: number;

  @Column({ name: 'code', type: 'simple-enum', enum: CoinEnum })
  code: CoinEnum;

  @Column({
    name: 'transaction_type',
    type: 'simple-enum',
    enum: TransactionTypeEnum,
  })
  transactionType: TransactionTypeEnum;

  @Column({
    name: 'is_negotiation',
    default: false,
  })
  isNegotiation: boolean;

  @ManyToOne(() => UserEntity, (user) => user.transactions)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;
}
