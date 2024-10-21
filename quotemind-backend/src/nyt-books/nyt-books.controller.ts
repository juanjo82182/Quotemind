import { Controller, Get } from '@nestjs/common';
import { NytBooksService } from './nyt-books.service';

@Controller('nyt-books')
export class NytBooksController {
  constructor(private readonly nytBooksService: NytBooksService) {}
  
  @Get('best-sellers')
  getBestSellers() {
    return this.nytBooksService.getBestSellers();
  }
}
