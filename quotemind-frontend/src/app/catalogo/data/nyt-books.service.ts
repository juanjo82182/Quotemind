import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NytBooksService {
  constructor(private http: HttpClient) {}

  getBestSellers(): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/nyt-books/best-sellers`);
  }
}