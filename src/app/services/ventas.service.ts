import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Venta } from '../model/Venta';

@Injectable({ providedIn: 'root' })
export class VentasService {
  private apiUrl = `${environment.apiUrl}/ventas`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Venta[]> {
    return this.http.get<Venta[]>(this.apiUrl).pipe(
      map(items => items.map(v => this.mapVenta(v)))
    );
  }

  getById(id: number): Observable<Venta> {
    return this.http.get<Venta>(`${this.apiUrl}/${id}`).pipe(
      map(v => this.mapVenta(v))
    );
  }

  create(data: Partial<Venta>): Observable<Venta> {
    return this.http.post<Venta>(this.apiUrl, data).pipe(
      map(v => this.mapVenta(v))
    );
  }

  update(id: number, data: Partial<Venta>): Observable<Venta> {
    return this.http.put<Venta>(`${this.apiUrl}/${id}`, data).pipe(
      map(v => this.mapVenta(v))
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private mapVenta(item: any): Venta {
    return {
      ...item,
      fecha: new Date(item.fecha),
      pagos: item.pagos?.map((p: any) => ({
        ...p,
        fecha: new Date(p.fecha),
      })),
      factura: item.factura ? {
        ...item.factura,
        fechaEmision: new Date(item.factura.fechaEmision),
        vencimientoCAE: item.factura.vencimientoCAE ? new Date(item.factura.vencimientoCAE) : undefined,
      } : undefined,
    };
  }
}
