import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'src/domain/entities/movie.entity';
import { MoviesService } from 'src/application/services/movies.service';
import { MoviesController } from 'src/infrastructure/controllers/movies.controller';
import { AwsLambdaService } from 'src/application/services/aws-lambda.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie])
  ],
  controllers: [MoviesController],
  providers: [
    MoviesService,
    AwsLambdaService
  ],
  exports: [MoviesService],
})
export class MoviesModule {} 