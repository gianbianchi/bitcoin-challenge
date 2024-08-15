import { MigrationInterface, QueryRunner } from "typeorm";

export class RefactorColumnIsNegotiation1723740034980 implements MigrationInterface {
    name = 'RefactorColumnIsNegotiation1723740034980'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_transaction" RENAME COLUMN "is_purchase" TO "is_negotiation"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_transaction" RENAME COLUMN "is_negotiation" TO "is_purchase"`);
    }

}
