import { Test, TestingModule } from '@nestjs/testing';
import { NytBooksController } from './nyt-books.controller';
import { NytBooksService } from './nyt-books.service';

describe('NytBooksController', () => {
  let controller: NytBooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NytBooksController],
      providers: [NytBooksService],
    }).compile();

    controller = module.get<NytBooksController>(NytBooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
