import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1665765130008 implements MigrationInterface {
    name = 'addedUserEntity1665765130008'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`);
        await queryRunner.query(`CREATE TABLE "user_roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "roleId" uuid, CONSTRAINT "PK_8acd5cf26ebd158416f477de799" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_88481b0c4ed9ada47e9fdd6747" ON "user_roles" ("userId", "roleId") `);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roleId"`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_472b25323af01488f1f66a06b67" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_86033897c009fcca8b6505d6be2" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_86033897c009fcca8b6505d6be2"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_472b25323af01488f1f66a06b67"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "roleId" uuid`);
        await queryRunner.query(`DROP INDEX "public"."IDX_88481b0c4ed9ada47e9fdd6747"`);
        await queryRunner.query(`DROP TABLE "user_roles"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
