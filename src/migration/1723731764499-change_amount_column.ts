import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeAmountColumn1723731764499 implements MigrationInterface {
  name = 'ChangeAmountColumn1723731764499';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tb_transaction" DROP COLUMN "amount"`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_transaction" ADD "amount" numeric(8,2) NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tb_transaction" DROP COLUMN "amount"`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_transaction" ADD "amount" integer NOT NULL`
    );
  }
}
