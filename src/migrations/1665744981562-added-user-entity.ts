import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1665744981562 implements MigrationInterface {
    name = 'addedUserEntity1665744981562'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "crops" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "code" character varying NOT NULL, CONSTRAINT "UQ_a72182c1b2156bd94d6b10f1eb4" UNIQUE ("code"), CONSTRAINT "PK_098dbeb7c803dc7c08a7f02b805" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "crops"`);
    }

}
