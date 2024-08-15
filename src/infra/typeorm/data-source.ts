import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'application',
  entities: ['src/infra/typeorm/entities/**.ts'],
  synchronize: false,
  migrations: ['src/migration/**/*.ts'],
  migrationsTableName: 'tb_migration',
});
