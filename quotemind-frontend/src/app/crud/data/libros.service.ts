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

  getLibros(): Observable<any[]> {
    return this._http.get<any[]>(`${environment.API_URL}/libros`);
  }

  getLibro(id: number): Observable<any> {
    return this._http.get<any>(`${environment.API_URL}/libros/${id}`);
  }

  
  updateLibro(id: number, libroData: any): Observable<any> {
    return this._http.patch(`${environment.API_URL}/libros/${id}`, libroData);
  }

  
  deleteLibro(id: number): Observable<any> {
    return this._http.delete(`${environment.API_URL}/libros/${id}`);
  }

}