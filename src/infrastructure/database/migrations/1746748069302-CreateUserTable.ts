import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1746748069302 implements MigrationInterface {
  name = 'CreateUserTable1746748069302';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.query(`CREATE TABLE "users" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "name" character varying NOT NULL,
            "email" character varying NOT NULL,
            "password" character varying NOT NULL,
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp"`);
  }
}
