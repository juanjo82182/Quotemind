import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLibroDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsOptional()
  @IsString()
  genre?: string;

  @IsOptional()
  published_date?: Date;

  @IsString()
  @IsNotEmpty()
  isbn: string;
}