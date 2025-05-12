import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/domain/entities/movie.entity';
import { getOffset } from 'src/shared/get-offset';
import { getTotalPages } from 'src/shared/get-total-pages';
import { Repository } from 'typeorm';
import { AwsLambdaService } from 'src/application/services/aws-lambda.service';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
    private awsLambdaService: AwsLambdaService,
  ) {}

  private convertToDate(dateString: string | undefined): Date | undefined {
    if (!dateString) return undefined;
    return new Date(dateString);
  }

  async createMovie(body: any) {
    const verifyMovie = await this.moviesRepository.findOne({
      where: {
        title: body.title,
      },
    });

    if (verifyMovie) {
      throw new Error('Movie already exists');
    }

    let imageLink: string | undefined = undefined;

    if (body.file) {
      imageLink = await this.awsLambdaService.uploadImage(
        body.file,
        body.title,
      );
    }

    try {
      const releaseDate = this.convertToDate(body.releaseDate);
      if (!releaseDate) {
        throw new Error('Invalid release date format. Expected YYYY-MM-DD');
      }

      const movie = this.moviesRepository.create({
        title: body.title,
        originalTitle: body.originalTitle,
        budget: body.budget,
        releaseDate,
        description: body.description,
        imageLink,
        genre: body.genre,
        duration: body.duration,
      });

      await this.moviesRepository.save(movie);

      return this.formatMovie(movie);
    } catch (error) {
      throw new Error('Error creating movie');
    }
  }

  async updateMovie(id: string, updateData: any) {
    const movie = await this.moviesRepository.findOne({
      where: { id },
    });

    if (!movie) {
      throw new Error('Movie not found');
    }

    const updateMovieData: Partial<Movie> = {
      ...updateData,
      releaseDate: updateData.releaseDate
        ? this.convertToDate(updateData.releaseDate)
        : undefined,
    };

    if (updateData.file) {
      updateMovieData.imageLink = await this.awsLambdaService.uploadImage(
        updateData.file,
        updateData.title || movie.title,
      );
    }

    Object.assign(movie, updateMovieData);
    await this.moviesRepository.save(movie);

    return this.formatMovie(movie);
  }

  async getAllMovies({
    page = 1,
    pageSize = 100,
    minDuration,
    maxDuration,
    startDate,
    endDate,
    genre,
  }: {
    page?: number;
    pageSize?: number;
    minDuration?: number;
    maxDuration?: number;
    startDate?: string;
    endDate?: string;
    genre?: string;
  }) {
    const queryBuilder = this.moviesRepository.createQueryBuilder('movie');

    if (minDuration !== undefined && minDuration !== null) {
      queryBuilder.andWhere('movie.duration >= :minDuration', { minDuration });
    }

    if (maxDuration !== undefined && maxDuration !== null) {
      queryBuilder.andWhere('movie.duration <= :maxDuration', { maxDuration });
    }

    if (startDate) {
      const startDateObj = this.convertToDate(startDate);
      if (startDateObj) {
        queryBuilder.andWhere('movie.releaseDate >= :startDate', {
          startDate: startDateObj,
        });
      }
    }

    if (endDate) {
      const endDateObj = this.convertToDate(endDate);
      if (endDateObj) {
        queryBuilder.andWhere('movie.releaseDate <= :endDate', {
          endDate: endDateObj,
        });
      }
    }

    if (genre) {
      queryBuilder.andWhere('LOWER(movie.genre) = LOWER(:genre)', { genre });
    }

    const query = queryBuilder
      .skip(getOffset({ page, pageSize }))
      .take(pageSize);

    const [movies, total] = await query.getManyAndCount();

    return {
      list: movies.map((movie) => this.formatMovie(movie)),
      paging: {
        total,
        pages: getTotalPages({ total, pageSize }),
        page,
      },
    };
  }

  private formatMovie(movie: Movie) {
    return {
      id: movie.id,
      title: movie.title,
      budget: movie.budget,
      releaseDate: movie.releaseDate,
      genre: movie.genre,
      duration: movie.duration,
      description: movie.description,
      imageLink: movie.imageLink,
      originalTitle: movie.originalTitle,
    };
  }
}
