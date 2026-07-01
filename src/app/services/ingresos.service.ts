import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Ingreso } from '../model/Ingreso';

@Injectable({ providedIn: 'root' })
export class IngresosService {
  private apiUrl = `${environment.apiUrl}/ingresos`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Ingreso[]> {
    return this.http.get<Ingreso[]>(this.apiUrl).pipe(
      map(items => items.map(i => this.mapIngreso(i)))
    );
  }

  getById(id: number): Observable<Ingreso> {
    return this.http.get<Ingreso>(`${this.apiUrl}/${id}`).pipe(
      map(i => this.mapIngreso(i))
    );
  }

  create(data: Partial<Ingreso>): Observable<Ingreso> {
    return this.http.post<Ingreso>(this.apiUrl, data).pipe(
      map(i => this.mapIngreso(i))
    );
  }

  update(id: number, data: Partial<Ingreso>): Observable<Ingreso> {
    return this.http.put<Ingreso>(`${this.apiUrl}/${id}`, data).pipe(
      map(i => this.mapIngreso(i))
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private mapIngreso(item: any): Ingreso {
    return {
      ...item,
      fecha: new Date(item.fecha),
    };
  }
}
