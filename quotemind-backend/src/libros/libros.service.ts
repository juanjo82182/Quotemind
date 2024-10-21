import { Injectable } from '@nestjs/common';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LibrosService {

  constructor(private prismaService: PrismaService) {}

  async create(createLibroDto: CreateLibroDto) {
    return await this.prismaService.books.create({
      data: createLibroDto,
    });
  }

  async findAll() {
    return await this.prismaService.books.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.books.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateLibroDto: UpdateLibroDto) {
    return await this.prismaService.books.update({
      where: { id },
      data: updateLibroDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.books.delete({
      where: { id },
    });
  }
}
