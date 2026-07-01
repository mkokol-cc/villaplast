import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CategoriasService {
  private apiUrl = `${environment.apiUrl}/categorias`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }

  add(nombre: string): Observable<string> {
    return this.http.post<string>(this.apiUrl, nombre);
  }
}
