import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTransactionTable1723691950975 implements MigrationInterface {
    name = 'CreateTransactionTable1723691950975'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tb_transaction" ("id" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "ammount" integer NOT NULL, "code" varchar CHECK( "code" IN ('brl','btc') ) NOT NULL, "transaction_type" varchar CHECK( "transaction_type" IN ('credit','debit') ) NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tb_transaction"`);
    }

}
