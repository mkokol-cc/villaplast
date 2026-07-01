import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Producto } from '../model/Producto';

@Injectable({ providedIn: 'root' })
export class ProductosService {
  private apiUrl = `${environment.apiUrl}/productos`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  getById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  create(data: Partial<Producto>): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, data);
  }

  update(id: number, data: Partial<Producto>): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
