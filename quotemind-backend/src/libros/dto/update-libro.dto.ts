import { PartialType } from '@nestjs/mapped-types';
import { CreateLibroDto } from './create-libro.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateLibroDto extends PartialType(CreateLibroDto) {
    @IsOptional()
    @IsString()
    title?: string;
  
    @IsOptional()
    @IsString()
    author?: string;
  
    @IsOptional()
    @IsString()
    genre?: string;
  
    @IsOptional()
    published_date?: Date;
  
    @IsOptional()
    @IsString()
    isbn?: string;
}
