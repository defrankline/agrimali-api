import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1665761512251 implements MigrationInterface {
    name = 'addedUserEntity1665761512251'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "crops" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "code" character varying NOT NULL, CONSTRAINT "UQ_a72182c1b2156bd94d6b10f1eb4" UNIQUE ("code"), CONSTRAINT "PK_098dbeb7c803dc7c08a7f02b805" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fertilizers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "code" character varying NOT NULL, CONSTRAINT "UQ_cd6dc6aeef8d89b9babf7441402" UNIQUE ("code"), CONSTRAINT "PK_399d9921df0b2e0eadbfc6a2373" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "crop_growth_stages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "position" integer NOT NULL, "cropId" uuid, "fertilizerId" uuid, CONSTRAINT "PK_efd23d8a93dc87e7c0d6920446d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "crop_photos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "photo" character varying NOT NULL, "cropId" uuid, CONSTRAINT "PK_e56238ab30c1d2915f2382b69d0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "units" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "code" character varying NOT NULL, CONSTRAINT "UQ_47635c1ab22d02fc3ebae3608b8" UNIQUE ("code"), CONSTRAINT "PK_5a8f2f064919b587d93936cb223" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "locations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "code" character varying NOT NULL, "parentId" uuid, CONSTRAINT "UQ_1c65ef243169e51b514c814eeae" UNIQUE ("code"), CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "estimated_crop_yield" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "quantity" integer NOT NULL, "cropId" uuid, "locationId" uuid, "unitId" uuid, CONSTRAINT "PK_5db4d3f43ba7098cd98cc39d940" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_9b9024a1a9c351564ad354fec9" ON "estimated_crop_yield" ("unitId", "cropId") `);
        await queryRunner.query(`CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL DEFAULT '', CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "soil" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "code" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_37e321185b326211c0f25a99b5e" UNIQUE ("code"), CONSTRAINT "PK_bc7efbd307095fd17ebeec730de" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "soil_crops" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "soilId" uuid, "cropId" uuid, CONSTRAINT "PK_511d55d37f6b7a26abb235f5852" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_71635228d70b6b53d953e3c59c" ON "soil_crops" ("soilId", "cropId") `);
        await queryRunner.query(`CREATE TABLE "soil_properties" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "property" character varying NOT NULL, "soilId" uuid, CONSTRAINT "PK_b5f83d4e2fc51b7ae06d66695f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sowing" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "fromDate" TIMESTAMP NOT NULL, "toDate" TIMESTAMP NOT NULL, "cropId" uuid, "locationId" uuid, CONSTRAINT "PK_89b97e5d4d52e43e044c0fc84a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "photo" character varying NOT NULL DEFAULT 'default.png', "verified" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "email_index" ON "users" ("email") `);
        await queryRunner.query(`ALTER TABLE "crop_growth_stages" ADD CONSTRAINT "FK_a997391946ba264505d8502492f" FOREIGN KEY ("cropId") REFERENCES "crops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "crop_growth_stages" ADD CONSTRAINT "FK_98c52de421e52cc8c13dd22c6af" FOREIGN KEY ("fertilizerId") REFERENCES "fertilizers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "crop_photos" ADD CONSTRAINT "FK_4c37b328fb5f27eb649a93fc9f6" FOREIGN KEY ("cropId") REFERENCES "crops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "locations" ADD CONSTRAINT "FK_9f238930bae84c7eafad3785d7b" FOREIGN KEY ("parentId") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "estimated_crop_yield" ADD CONSTRAINT "FK_4d8e723ae07e84fbd211bf4e6b9" FOREIGN KEY ("cropId") REFERENCES "crops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "estimated_crop_yield" ADD CONSTRAINT "FK_d28da48077cafc4ac82e5786f8a" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "estimated_crop_yield" ADD CONSTRAINT "FK_57920e8158828228197ac0a011d" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "soil_crops" ADD CONSTRAINT "FK_ecf0194e0f864e371a405dc3520" FOREIGN KEY ("soilId") REFERENCES "soil"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "soil_crops" ADD CONSTRAINT "FK_4be9cbbf71dbf80a8a2635d16f7" FOREIGN KEY ("cropId") REFERENCES "crops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "soil_properties" ADD CONSTRAINT "FK_0ea7561acec44e7e75be89e5755" FOREIGN KEY ("soilId") REFERENCES "soil"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sowing" ADD CONSTRAINT "FK_c6647148efe77392a25275860e4" FOREIGN KEY ("cropId") REFERENCES "crops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sowing" ADD CONSTRAINT "FK_795ecff0bf24475947948685eb8" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sowing" DROP CONSTRAINT "FK_795ecff0bf24475947948685eb8"`);
        await queryRunner.query(`ALTER TABLE "sowing" DROP CONSTRAINT "FK_c6647148efe77392a25275860e4"`);
        await queryRunner.query(`ALTER TABLE "soil_properties" DROP CONSTRAINT "FK_0ea7561acec44e7e75be89e5755"`);
        await queryRunner.query(`ALTER TABLE "soil_crops" DROP CONSTRAINT "FK_4be9cbbf71dbf80a8a2635d16f7"`);
        await queryRunner.query(`ALTER TABLE "soil_crops" DROP CONSTRAINT "FK_ecf0194e0f864e371a405dc3520"`);
        await queryRunner.query(`ALTER TABLE "estimated_crop_yield" DROP CONSTRAINT "FK_57920e8158828228197ac0a011d"`);
        await queryRunner.query(`ALTER TABLE "estimated_crop_yield" DROP CONSTRAINT "FK_d28da48077cafc4ac82e5786f8a"`);
        await queryRunner.query(`ALTER TABLE "estimated_crop_yield" DROP CONSTRAINT "FK_4d8e723ae07e84fbd211bf4e6b9"`);
        await queryRunner.query(`ALTER TABLE "locations" DROP CONSTRAINT "FK_9f238930bae84c7eafad3785d7b"`);
        await queryRunner.query(`ALTER TABLE "crop_photos" DROP CONSTRAINT "FK_4c37b328fb5f27eb649a93fc9f6"`);
        await queryRunner.query(`ALTER TABLE "crop_growth_stages" DROP CONSTRAINT "FK_98c52de421e52cc8c13dd22c6af"`);
        await queryRunner.query(`ALTER TABLE "crop_growth_stages" DROP CONSTRAINT "FK_a997391946ba264505d8502492f"`);
        await queryRunner.query(`DROP INDEX "public"."email_index"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "sowing"`);
        await queryRunner.query(`DROP TABLE "soil_properties"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_71635228d70b6b53d953e3c59c"`);
        await queryRunner.query(`DROP TABLE "soil_crops"`);
        await queryRunner.query(`DROP TABLE "soil"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9b9024a1a9c351564ad354fec9"`);
        await queryRunner.query(`DROP TABLE "estimated_crop_yield"`);
        await queryRunner.query(`DROP TABLE "locations"`);
        await queryRunner.query(`DROP TABLE "units"`);
        await queryRunner.query(`DROP TABLE "crop_photos"`);
        await queryRunner.query(`DROP TABLE "crop_growth_stages"`);
        await queryRunner.query(`DROP TABLE "fertilizers"`);
        await queryRunner.query(`DROP TABLE "crops"`);
    }

}
