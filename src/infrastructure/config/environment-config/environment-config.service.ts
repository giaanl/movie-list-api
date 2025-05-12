import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from 'src/domain/interfaces/database-interface';

@Injectable()
export class EnvironmentConfigService implements DatabaseConfig {
  constructor(private configService: ConfigService) {}

  getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST') || 'localhost';
  }

  getDatabasePort(): number {
    return this.configService.get<number>('DATABASE_PORT') || 5432;
  }

  getDatabaseUser(): string {
    return this.configService.get<string>('DATABASE_USER') || 'postgres';
  }

  getDatabasePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD') || 'postgres';
  }

  getDatabaseName(): string {
    return this.configService.get<string>('DATABASE_NAME') || 'postgres';
  }
}
