import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LibrosModule } from './libros/libros.module';
import { NytBooksModule } from './nyt-books/nyt-books.module';



@Module({
  imports: [AuthModule, LibrosModule, NytBooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
