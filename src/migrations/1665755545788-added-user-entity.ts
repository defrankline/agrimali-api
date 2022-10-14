import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1665755545788 implements MigrationInterface {
    name = 'addedUserEntity1665755545788'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "soil" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "code" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_37e321185b326211c0f25a99b5e" UNIQUE ("code"), CONSTRAINT "PK_bc7efbd307095fd17ebeec730de" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "soil_crops" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "soilId" uuid, "cropId" uuid, CONSTRAINT "PK_511d55d37f6b7a26abb235f5852" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_71635228d70b6b53d953e3c59c" ON "soil_crops" ("soilId", "cropId") `);
        await queryRunner.query(`CREATE TABLE "soil_properties" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "property" character varying NOT NULL, "soilId" uuid, CONSTRAINT "PK_b5f83d4e2fc51b7ae06d66695f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "soil_crops" ADD CONSTRAINT "FK_ecf0194e0f864e371a405dc3520" FOREIGN KEY ("soilId") REFERENCES "soil"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "soil_crops" ADD CONSTRAINT "FK_4be9cbbf71dbf80a8a2635d16f7" FOREIGN KEY ("cropId") REFERENCES "crops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "soil_properties" ADD CONSTRAINT "FK_0ea7561acec44e7e75be89e5755" FOREIGN KEY ("soilId") REFERENCES "soil"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "soil_properties" DROP CONSTRAINT "FK_0ea7561acec44e7e75be89e5755"`);
        await queryRunner.query(`ALTER TABLE "soil_crops" DROP CONSTRAINT "FK_4be9cbbf71dbf80a8a2635d16f7"`);
        await queryRunner.query(`ALTER TABLE "soil_crops" DROP CONSTRAINT "FK_ecf0194e0f864e371a405dc3520"`);
        await queryRunner.query(`DROP TABLE "soil_properties"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_71635228d70b6b53d953e3c59c"`);
        await queryRunner.query(`DROP TABLE "soil_crops"`);
        await queryRunner.query(`DROP TABLE "soil"`);
    }

}
