import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateColumnIsNegotiation1723739292277 implements MigrationInterface {
    name = 'CreateColumnIsNegotiation1723739292277'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_transaction" ADD "is_purchase" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_transaction" DROP COLUMN "is_purchase"`);
    }

}
