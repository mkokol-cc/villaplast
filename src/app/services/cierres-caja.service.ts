import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CierreCaja } from '../model/CierreCaja';

@Injectable({ providedIn: 'root' })
export class CierresCajaService {
  private apiUrl = `${environment.apiUrl}/cierresCaja`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<CierreCaja[]> {
    return this.http.get<CierreCaja[]>(this.apiUrl).pipe(
      map(items => items.map(c => this.mapCierre(c)))
    );
  }

  getById(id: number): Observable<CierreCaja> {
    return this.http.get<CierreCaja>(`${this.apiUrl}/${id}`).pipe(
      map(c => this.mapCierre(c))
    );
  }

  create(data: Partial<CierreCaja>): Observable<CierreCaja> {
    return this.http.post<CierreCaja>(this.apiUrl, data).pipe(
      map(c => this.mapCierre(c))
    );
  }

  private mapCierre(item: any): CierreCaja {
    return {
      ...item,
      fecha: new Date(item.fecha),
    };
  }
}
