import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';
import { User } from 'src/domain/entities/user.entity';

export const getTypeOrmModuleOptions = (
  config: EnvironmentConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: config.getDatabaseHost(),
  port: config.getDatabasePort(),
  username: config.getDatabaseUser(),
  password: config.getDatabasePassword(),
  database: config.getDatabaseName(),
  entities: [User],
  synchronize: true,
}); 