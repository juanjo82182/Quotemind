import { Test, TestingModule } from '@nestjs/testing';
import { NytBooksService } from './nyt-books.service';

describe('NytBooksService', () => {
  let service: NytBooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NytBooksService],
    }).compile();

    service = module.get<NytBooksService>(NytBooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
