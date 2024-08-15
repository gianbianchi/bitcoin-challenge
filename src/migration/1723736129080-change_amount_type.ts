import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeAmountType1723736129080 implements MigrationInterface {
    name = 'ChangeAmountType1723736129080'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_transaction" ALTER COLUMN "amount" TYPE numeric(27,18)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_transaction" ALTER COLUMN "amount" TYPE numeric(8,2)`);
    }

}
