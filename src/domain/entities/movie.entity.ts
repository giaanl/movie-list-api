import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('movies')
export class Movie extends BaseEntity {
  @Column({
    type: 'varchar',
    name: 'title',
    nullable: false,
    unique: true,
    length: 100,
  })
  title: string;

  @Column({
    type: 'text',
    name: 'description',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'varchar',
    name: 'budget',
    nullable: true,
  })
  budget: string;

  @Column({
    type: 'date',
    name: 'release_date',
    nullable: true,
  })
  releaseDate: Date;

  @Column({
    type: 'varchar',
    name: 'image_path',
    nullable: true,
    length: 255,
  })
  imagePath: string;

  @Column({
    type: 'varchar',
    name: 'user_id',
    nullable: false,
    length: 36,
  })
  userId: string;

  @Column({
    type: 'varchar',
    name: 'genre',
    nullable: true,
    length: 100,
  })
  genre: string;

  @Column({
    type: 'integer',
    name: 'duration',
    nullable: true,
  })
  duration: number;
}
