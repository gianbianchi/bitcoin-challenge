import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateQuotationColumn1723737389696 implements MigrationInterface {
    name = 'CreateQuotationColumn1723737389696'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_transaction" ADD "quotation" numeric(27,18) NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_transaction" DROP COLUMN "quotation"`);
    }

}
