import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NytBooksService } from './nyt-books.service';
import { NytBooksController } from './nyt-books.controller';

@Module({
  imports: [HttpModule],
  controllers: [NytBooksController],
  providers: [NytBooksService],
})
export class NytBooksModule {}
