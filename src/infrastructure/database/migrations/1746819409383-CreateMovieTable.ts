import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMovieTable1746819409383 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movies" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "title" character varying NOT NULL,
            "description" character varying NOT NULL,
            "budget" character varying NOT NULL,
            "release_date" date NOT NULL,
            "image_path" character varying NOT NULL,
            "user_id" uuid NOT NULL,
            "genre" character varying NOT NULL,
            "duration" integer NOT NULL,
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            CONSTRAINT "PK_98a2ff63e4d1c997e4e70b704ed" PRIMARY KEY ("id"),
            CONSTRAINT "FK_98a2ff63e4d1c997e4e70b704ed" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "movies"`);
    }

}
