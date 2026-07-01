import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Proveedor } from '../model/Proveedor';

@Injectable({ providedIn: 'root' })
export class ProveedoresService {
  private apiUrl = `${environment.apiUrl}/proveedores`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.apiUrl).pipe(
      map(items => items.map(p => this.mapProveedor(p)))
    );
  }

  getById(id: number): Observable<Proveedor> {
    return this.http.get<Proveedor>(`${this.apiUrl}/${id}`).pipe(
      map(p => this.mapProveedor(p))
    );
  }

  create(data: Partial<Proveedor>): Observable<Proveedor> {
    return this.http.post<Proveedor>(this.apiUrl, data).pipe(
      map(p => this.mapProveedor(p))
    );
  }

  update(id: number, data: Partial<Proveedor>): Observable<Proveedor> {
    return this.http.put<Proveedor>(`${this.apiUrl}/${id}`, data).pipe(
      map(p => this.mapProveedor(p))
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private mapProveedor(item: any): Proveedor {
    return {
      ...item,
      ultimaCompra: item.ultimaCompra ? new Date(item.ultimaCompra) : undefined,
    };
  }
}
