import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Compra } from '../model/Compra';

@Injectable({ providedIn: 'root' })
export class ComprasService {
  private apiUrl = `${environment.apiUrl}/compras`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Compra[]> {
    return this.http.get<Compra[]>(this.apiUrl).pipe(
      map(items => items.map(c => this.mapCompra(c)))
    );
  }

  getById(id: number): Observable<Compra> {
    return this.http.get<Compra>(`${this.apiUrl}/${id}`).pipe(
      map(c => this.mapCompra(c))
    );
  }

  create(data: Partial<Compra>): Observable<Compra> {
    return this.http.post<Compra>(this.apiUrl, data).pipe(
      map(c => this.mapCompra(c))
    );
  }

  private mapCompra(item: any): Compra {
    return {
      ...item,
      fecha: new Date(item.fecha),
    };
  }
}
