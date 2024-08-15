import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDb1723693766796 implements MigrationInterface {
    name = 'CreateDb1723693766796'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."tb_transaction_code_enum" AS ENUM('brl', 'btc')`);
        await queryRunner.query(`CREATE TYPE "public"."tb_transaction_transaction_type_enum" AS ENUM('credit', 'debit')`);
        await queryRunner.query(`CREATE TABLE "tb_transaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "amount" integer NOT NULL, "code" "public"."tb_transaction_code_enum" NOT NULL, "transaction_type" "public"."tb_transaction_transaction_type_enum" NOT NULL, "user_id" uuid, CONSTRAINT "PK_60ebc65df88c25409fc36c958f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(150) NOT NULL, "email" character varying(150) NOT NULL, "password" character varying(64) NOT NULL, CONSTRAINT "UQ_ebe445a8233800b2f59004d8ddc" UNIQUE ("email"), CONSTRAINT "PK_1943338f8f00e074a3c5bb48d5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tb_transaction" ADD CONSTRAINT "FK_26ba469200d5ac7382c6350b8ee" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_transaction" DROP CONSTRAINT "FK_26ba469200d5ac7382c6350b8ee"`);
        await queryRunner.query(`DROP TABLE "tb_user"`);
        await queryRunner.query(`DROP TABLE "tb_transaction"`);
        await queryRunner.query(`DROP TYPE "public"."tb_transaction_transaction_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."tb_transaction_code_enum"`);
    }

}
