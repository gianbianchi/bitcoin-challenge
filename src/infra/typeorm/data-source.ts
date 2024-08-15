import { DataSource } from 'typeorm';
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from '../../shared/constants/constants';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: ['src/infra/typeorm/entities/**.ts'],
  synchronize: false,
  migrations: ['src/migration/**/*.ts'],
  migrationsTableName: 'tb_migration',
});
