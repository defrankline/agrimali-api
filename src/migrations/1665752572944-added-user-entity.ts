import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1665752572944 implements MigrationInterface {
    name = 'addedUserEntity1665752572944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "fertilizers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "code" character varying NOT NULL, CONSTRAINT "UQ_cd6dc6aeef8d89b9babf7441402" UNIQUE ("code"), CONSTRAINT "PK_399d9921df0b2e0eadbfc6a2373" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "fertilizers"`);
    }

}
