import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  getConsumos(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:62889/api/Consumos/listar');
  }
  getConsumosHists(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:62889/api/ConsumosHists/listar');
  }
  getHistPersos1(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:62889/api/HistPersos1/listar');
  }
}
