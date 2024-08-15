import { MigrationInterface, QueryRunner } from "typeorm";

export class QuotationHistoryTable1723751946543 implements MigrationInterface {
    name = 'QuotationHistoryTable1723751946543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tb_quotation_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "buy_quotation" numeric(27,18) NOT NULL, "sell_quotation" numeric(27,18) NOT NULL, CONSTRAINT "PK_514057dd6bc1ff8205057e535a3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tb_quotation_history"`);
    }

}
