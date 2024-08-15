import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFkTransationToUser1723692868941 implements MigrationInterface {
    name = 'CreateFkTransationToUser1723692868941'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_tb_transaction" ("id" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "code" varchar CHECK( "code" IN ('brl','btc') ) NOT NULL, "transaction_type" varchar CHECK( "transaction_type" IN ('credit','debit') ) NOT NULL, "amount" integer NOT NULL, "userId" varchar)`);
        await queryRunner.query(`INSERT INTO "temporary_tb_transaction"("id", "created_at", "updated_at", "code", "transaction_type", "amount", "userId") SELECT "id", "created_at", "updated_at", "code", "transaction_type", "amount", "userId" FROM "tb_transaction"`);
        await queryRunner.query(`DROP TABLE "tb_transaction"`);
        await queryRunner.query(`ALTER TABLE "temporary_tb_transaction" RENAME TO "tb_transaction"`);
        await queryRunner.query(`CREATE TABLE "temporary_tb_transaction" ("id" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "code" varchar CHECK( "code" IN ('brl','btc') ) NOT NULL, "transaction_type" varchar CHECK( "transaction_type" IN ('credit','debit') ) NOT NULL, "amount" integer NOT NULL, "user_id" varchar)`);
        await queryRunner.query(`INSERT INTO "temporary_tb_transaction"("id", "created_at", "updated_at", "code", "transaction_type", "amount", "user_id") SELECT "id", "created_at", "updated_at", "code", "transaction_type", "amount", "userId" FROM "tb_transaction"`);
        await queryRunner.query(`DROP TABLE "tb_transaction"`);
        await queryRunner.query(`ALTER TABLE "temporary_tb_transaction" RENAME TO "tb_transaction"`);
        await queryRunner.query(`CREATE TABLE "temporary_tb_transaction" ("id" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "code" varchar CHECK( "code" IN ('brl','btc') ) NOT NULL, "transaction_type" varchar CHECK( "transaction_type" IN ('credit','debit') ) NOT NULL, "amount" integer NOT NULL, "user_id" varchar, CONSTRAINT "FK_26ba469200d5ac7382c6350b8ee" FOREIGN KEY ("user_id") REFERENCES "tb_user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_tb_transaction"("id", "created_at", "updated_at", "code", "transaction_type", "amount", "user_id") SELECT "id", "created_at", "updated_at", "code", "transaction_type", "amount", "user_id" FROM "tb_transaction"`);
        await queryRunner.query(`DROP TABLE "tb_transaction"`);
        await queryRunner.query(`ALTER TABLE "temporary_tb_transaction" RENAME TO "tb_transaction"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_transaction" RENAME TO "temporary_tb_transaction"`);
        await queryRunner.query(`CREATE TABLE "tb_transaction" ("id" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "code" varchar CHECK( "code" IN ('brl','btc') ) NOT NULL, "transaction_type" varchar CHECK( "transaction_type" IN ('credit','debit') ) NOT NULL, "amount" integer NOT NULL, "user_id" varchar)`);
        await queryRunner.query(`INSERT INTO "tb_transaction"("id", "created_at", "updated_at", "code", "transaction_type", "amount", "user_id") SELECT "id", "created_at", "updated_at", "code", "transaction_type", "amount", "user_id" FROM "temporary_tb_transaction"`);
        await queryRunner.query(`DROP TABLE "temporary_tb_transaction"`);
        await queryRunner.query(`ALTER TABLE "tb_transaction" RENAME TO "temporary_tb_transaction"`);
        await queryRunner.query(`CREATE TABLE "tb_transaction" ("id" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "code" varchar CHECK( "code" IN ('brl','btc') ) NOT NULL, "transaction_type" varchar CHECK( "transaction_type" IN ('credit','debit') ) NOT NULL, "amount" integer NOT NULL, "userId" varchar)`);
        await queryRunner.query(`INSERT INTO "tb_transaction"("id", "created_at", "updated_at", "code", "transaction_type", "amount", "userId") SELECT "id", "created_at", "updated_at", "code", "transaction_type", "amount", "user_id" FROM "temporary_tb_transaction"`);
        await queryRunner.query(`DROP TABLE "temporary_tb_transaction"`);
        await queryRunner.query(`ALTER TABLE "tb_transaction" RENAME TO "temporary_tb_transaction"`);
        await queryRunner.query(`CREATE TABLE "tb_transaction" ("id" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "code" varchar CHECK( "code" IN ('brl','btc') ) NOT NULL, "transaction_type" varchar CHECK( "transaction_type" IN ('credit','debit') ) NOT NULL, "amount" integer NOT NULL, "userId" varchar, CONSTRAINT "FK_8dc2593650d9c16aba9d3c7bc99" FOREIGN KEY ("userId") REFERENCES "tb_user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "tb_transaction"("id", "created_at", "updated_at", "code", "transaction_type", "amount", "userId") SELECT "id", "created_at", "updated_at", "code", "transaction_type", "amount", "userId" FROM "temporary_tb_transaction"`);
        await queryRunner.query(`DROP TABLE "temporary_tb_transaction"`);
    }

}
