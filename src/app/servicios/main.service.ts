import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Consumos } from '../modelos/Consumos';
import { HistPerso1 } from '../modelos/HistPerso1';
import { ConsumosHists } from '../modelos/ConsumosHists';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  invokeBuscarFunction = new EventEmitter();    
  subsVar: Subscription; 

  constructor(private http: HttpClient) { }

  filter(desde: string, hasta: string, centro?: string){
    if(centro == null){
      this.getConsumos(desde, hasta);
    }else{
      this.getConsumos(desde, hasta, centro);
    }
  }

  getConsumos(desde: string, hasta: string, centro?: string): Observable<any[]> {
    if(centro == null){
      return this.http.get<any[]>(`http://localhost:62889/api/ConsumosHists/buscarConsumos/${desde}/${hasta}`);
    }else{
      return this.http.get<any[]>(`http://localhost:62889/api/ConsumosHists/buscarConsumos/${desde}/${hasta}/${centro}`);
    }
  }

  getCentrosCosto(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:62889/api/CentroCostos/listar%27)');
  }

  buscarConsumos() {    
    this.invokeBuscarFunction.emit();    
  } 
}
