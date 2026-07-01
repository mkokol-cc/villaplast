import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { MovimientoStock } from '../model/MovimientoStock';

@Injectable({ providedIn: 'root' })
export class MovimientosStockService {
  private apiUrl = `${environment.apiUrl}/movimientosStock`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<MovimientoStock[]> {
    return this.http.get<MovimientoStock[]>(this.apiUrl).pipe(
      map(items => items.map(m => this.mapMovimiento(m)))
    );
  }

  getById(id: number): Observable<MovimientoStock> {
    return this.http.get<MovimientoStock>(`${this.apiUrl}/${id}`).pipe(
      map(m => this.mapMovimiento(m))
    );
  }

  create(data: Partial<MovimientoStock>): Observable<MovimientoStock> {
    return this.http.post<MovimientoStock>(this.apiUrl, data).pipe(
      map(m => this.mapMovimiento(m))
    );
  }

  private mapMovimiento(item: any): MovimientoStock {
    return {
      ...item,
      fecha: new Date(item.fecha),
    };
  }
}
