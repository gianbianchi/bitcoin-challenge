import 'dotenv/config';
import { DataSource } from 'typeorm';
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
  MIGRATION_PATH,
} from '../../shared/constants/constants';
import { QuotationHistoryEntity } from './entities/quotation-history.entity';
import { TransactionEntity } from './entities/transaction.entity';
import { UserEntity } from './entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [QuotationHistoryEntity, TransactionEntity, UserEntity],
  synchronize: false,
  migrations: [MIGRATION_PATH || 'src/migration/**/*.ts'],
  migrationsTableName: 'tb_migration',
});
