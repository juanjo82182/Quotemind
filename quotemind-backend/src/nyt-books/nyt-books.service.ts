import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class NytBooksService {
    private readonly API_URL = 'https://api.nytimes.com/svc/books/v3/lists.json';
  private readonly API_KEY = process.env.API_KEY;

  constructor(private readonly httpService: HttpService) {}

  getBestSellers(): Observable<any> {
    return this.httpService
      .get(`${this.API_URL}?api-key=${this.API_KEY}&list=hardcover-fiction`)
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          return throwError(new HttpException(error.response.data, HttpStatus.BAD_REQUEST));
        }),
      );
  }
}
