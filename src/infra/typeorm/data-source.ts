import { DataSource } from 'typeorm';

// TODO: Alterar AppDataSource
// export const dataSource = new DataSource({
//   type: 'mysql',
//   host: 'localhost',
//   port: 3306,
//   username: 'test',
//   password: 'test',
//   database: 'test',
//   entities: ['src/entity/*.js'],
//   logging: true,
//   synchronize: true,
// });

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './database/database.sqlite',
  entities: ['src/infra/typeorm/entities/**.ts'],
  synchronize: false,
  migrations: ['src/migration/**/*.ts'],
  migrationsTableName: 'tb_migration',
});
