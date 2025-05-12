import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { TypeOrmConfigModule } from './infrastructure/config/typeorm/typeorm.module';
import { AuthenticationModule } from './infrastructure/config/authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import { MoviesModule } from './infrastructure/config/movies/movies.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EnvironmentConfigModule,
    TypeOrmConfigModule,
    AuthenticationModule,
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
