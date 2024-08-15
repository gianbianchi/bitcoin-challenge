import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

@Entity({ name: 'tb_quotation_history' })
export class QuotationHistoryEntity extends AbstractEntity<QuotationHistoryEntity> {
  @Column('decimal', {
    name: 'buy_quotation',
    precision: 27,
    scale: 18,
  })
  buyQuotation: number;

  @Column('decimal', {
    name: 'sell_quotation',
    precision: 27,
    scale: 18,
  })
  sellQuotation: number;
}
