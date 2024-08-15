import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1723686163206 implements MigrationInterface {
    name = 'CreateUserTable1723686163206'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tb_user" ("id" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar(150) NOT NULL, "email" varchar(150) NOT NULL, "password" varchar(64) NOT NULL, CONSTRAINT "UQ_ebe445a8233800b2f59004d8ddc" UNIQUE ("email"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tb_user"`);
    }

}
