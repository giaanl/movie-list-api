import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { MoviesService } from '../../application/services/movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  async createMovie(@Body() body: any) {
    return this.moviesService.createMovie(body);
  }

  @Put(':id')
  async updateMovie(
    @Param('id') id: string,
    @Body() updateData: any,
  ) {
    return this.moviesService.updateMovie(id, updateData);
  }

  @Get()
  async getAllMovies(
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
    @Query('minDuration') minDuration?: number,
    @Query('maxDuration') maxDuration?: number,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('genre') genre?: string,
  ) {
    return this.moviesService.getAllMovies({
      page,
      pageSize,
      minDuration,
      maxDuration,
      startDate,
      endDate,
      genre,
    });
  }
}
