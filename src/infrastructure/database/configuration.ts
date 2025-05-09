import { DataSource } from "typeorm";
import { config } from "dotenv";
import { ConfigService } from "@nestjs/config";
import { User } from "../../domain/entities/user.entity";

config();

const configService = new ConfigService();
const conf = {
    type: configService.get("DATABASE_TYPE"),
    host: configService.get("DATABASE_HOST"),
    port: configService.get("DATABASE_DOCKER_PORT"),
    username: configService.get("DATABASE_USER"),
    password: configService.get("DATABASE_PASSWORD"),
    database: configService.get("DATABASE_NAME"),
    migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
    entities: [User]
}

console.log(conf);

export default new DataSource(conf);
