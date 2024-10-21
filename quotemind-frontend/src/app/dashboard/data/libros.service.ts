import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  private _http = inject(HttpClient);

  constructor() {}

  createLibro(libroData: any): Observable<any> {
    return this._http.post(`${environment.API_URL}/libros`, libroData);
  }
}