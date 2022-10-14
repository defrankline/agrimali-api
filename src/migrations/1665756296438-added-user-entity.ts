import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1665756296438 implements MigrationInterface {
    name = 'addedUserEntity1665756296438'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "crop_photos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "photo" character varying NOT NULL, "cropId" uuid, CONSTRAINT "PK_e56238ab30c1d2915f2382b69d0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "crop_photos" ADD CONSTRAINT "FK_4c37b328fb5f27eb649a93fc9f6" FOREIGN KEY ("cropId") REFERENCES "crops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "crop_photos" DROP CONSTRAINT "FK_4c37b328fb5f27eb649a93fc9f6"`);
        await queryRunner.query(`DROP TABLE "crop_photos"`);
    }

}
