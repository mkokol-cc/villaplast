import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Cliente } from '../model/Cliente';

@Injectable({ providedIn: 'root' })
export class ClientesService {
  private apiUrl = `${environment.apiUrl}/clientes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl).pipe(
      map(items => items.map(c => this.mapCliente(c)))
    );
  }

  getById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`).pipe(
      map(c => this.mapCliente(c))
    );
  }

  create(data: Partial<Cliente>): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, data).pipe(
      map(c => this.mapCliente(c))
    );
  }

  update(id: number, data: Partial<Cliente>): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${id}`, data).pipe(
      map(c => this.mapCliente(c))
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private mapCliente(item: any): Cliente {
    return {
      ...item,
      ultimaCompra: item.ultimaCompra ? new Date(item.ultimaCompra) : undefined,
    };
  }
}
