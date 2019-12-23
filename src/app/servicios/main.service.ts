import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Consumos } from '../modelos/Consumos';
import { HistPerso1 } from '../modelos/HistPerso1';
import { ConsumosHists } from '../modelos/ConsumosHists';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  desde: any;
  hasta: any;

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
  getCentrosCosto(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:62889/api/CentroCostos/listar');
  }
  sendFechas(desde: any, hasta: any) {
  this.desde = desde;
  this.hasta = hasta;
  }
  getHasta(): Observable<any> {
  return this.hasta;
  }
  getDesde(): Observable<any> {
  return this.desde;
  }
}
