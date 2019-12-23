import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MainService } from 'src/app/servicios/main.service';
import {MatDividerModule} from '@angular/material/divider';
import { Consumos } from 'src/app/modelos/Consumos';
import { ConsumosHists } from 'src/app/modelos/ConsumosHists';
import { HistPerso1 } from '../../modelos/HistPerso1';

import { ToolbarComponent } from 'src/app/componentes/toolbar/toolbar.component';

const Consumos2 = [
  {
    "tarjeta": "00754021",
    "nombre": "GALARZA OSCAR DARIO",
    "centro": "0109OEMN01",
    "uo": "COP4",
    "turno": 4.0,
    "fecha": "20191001",
    "hora": "01:50",
},
{
  "tarjeta": "00754021",
  "nombre": "GALARZA OSCAR DARIO",
  "centro": "0109OEMN01",
  "uo": "COP4",
  "turno": 4.0,
  "fecha": "20191001",
  "hora": "01:50",
},
{
  "tarjeta": "00754021",
  "nombre": "GALARZA OSCAR DARIO",
  "centro": "0109OEMN01",
  "uo": "COP4",
  "turno": 4.0,
  "fecha": "20191001",
  "hora": "01:50",
},
{
  "tarjeta": "00754021",
  "nombre": "GALARZA OSCAR DARIO",
  "centro": "0109OEMN01",
  "uo": "COP4",
  "turno": 4.0,
  "fecha": "20191001",
  "hora": "01:50",
},
{
  "tarjeta": "00754021",
  "nombre": "GALARZA OSCAR DARIO",
  "centro": "0109OEMN01",
  "uo": "COP4",
  "turno": 4.0,
  "fecha": "20191001",
  "hora": "01:50",
},
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  // displayedColumns: string[] = ['id', 'name', 'progress', 'color', 'fruta'];
  // displayedColumns: string[] = [ 'auditNumber', 'estadoActual', 'number', 'author', 'creationStamp', 'answerType', 'dias', 
  //'origenPlanMejora', 'responsible', 'sabor', 'sector', 'size', 'topic'];
  displayedColumns: string[] = ['tarjeta','nombre','centro','uo','turno','fecha','hora'];
  dataSource: MatTableDataSource<any>;
  show: boolean = true;
  filtro: boolean;
  consumosList = [];
  consumosHistsList = [];
  histPerso1List = [];
  listaReporte = [];
  desde: any;
  hasta: any;
  centrosCosto = [];

@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
@ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private mainService: MainService) {

  }

  ngOnInit() {
    this.getConsumos();
    this.getConsumosHists();
    this.getHistPersos1();
    this.getCentros();
    this.armarGrilla();
  }

  generarReporte() {
    for (let i = 0; i < this.consumosList.length; i++) {

      if (this.consumosList[i].fecha_Consumo >= '20191201' && this.consumosList[i].fecha_Consumo <= '20191231') {

        for (let j = 0; j < this.histPerso1List.length; j++) {

          if (this.consumosList[i].numero_tarjeta === this.histPerso1List[j].zausw) {
            // console.log(this.consumosList[i].numero_tarjeta, this.histPerso1List[j].zausw, this.histPerso1List[j].ename);

            // for (let k = 0; k < this.centrosCosto.length; k++) {

              // if (this.centrosCosto[k].codigo === ) {

                this.listaReporte.push(this.consumosList[i].numero_tarjeta, this.histPerso1List[j].ename, 'CENTRO',
                this.consumosList[i].departamento, this.consumosList[i].numero_turno,
                this.consumosList[i].fecha_Consumo , this.consumosList[i].hora);
                // var itemsConsumos: any = new (this.consumosList[i].numero_tarjeta, this.histPerso1List[j].ename, 'CENTRO',
                // this.consumosList[i].departamento, this.consumosList[i].numero_turno,
                // this.consumosList[i].fecha_Consumo , this.consumosList[i].hora);
            //   }
            // }

          }
        }
      }
      // this.listaReporte.push(itemsConsumos);
    }

    console.log(this.listaReporte);
    // this.armarGrilla();
  }
  getCentros() {
    this.mainService.getCentrosCosto().subscribe( data => {
      this.centrosCosto = data;
      console.log('call API getCentrosCosto');
      console.log(this.centrosCosto);
    }, error => {
      console.log('fallo el call de la API getCentrosCosto');
      console.log(error);
    });
  }
  armarGrilla() {
    // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
    // this.dataSource = new MatTableDataSource(LISTA);
    this.dataSource = new MatTableDataSource(Consumos2);
    // this.dataSource = new MatTableDataSource(users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  hideSearch() {
    this.show = false;
    }
  showSearch() {
    this.show = true;
    if (this.show && this.filtro) {
    this.show = false;
    }
    }

  applyFilter(filterValue: string) {
    this.filtro = true;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (filterValue === '') {
      this.filtro = false;
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getDesdeHasta() {
// DESDE
  this.mainService.getDesde().subscribe( data => {
    this.desde = data;
    console.log('call API getDesde');
    console.log(this.desde);
  }, error => {
    console.log('fallo el call de la API getDesde');
    console.log(error);
  });
// HASTA
  this.mainService.getHasta().subscribe( data => {
    this.hasta = data;
    console.log('call API getHasta');
    console.log(this.hasta);
  }, error => {
    console.log('fallo el call de la API getHasta');
    console.log(error);
  });

  // this.generarReporte();

  }

  getConsumos() {
    this.mainService.getConsumos().subscribe( data => {
      this.consumosList = data;
      console.log('call API getConsumos');
      console.log(this.consumosList);
    }, error => {
      console.log('fallo el call de la API getConsumos');
      console.log(error);
    });
  }
  getConsumosHists() {
    this.mainService.getConsumosHists().subscribe( data => {
      this.consumosHistsList = data;
      console.log('call API getConsumosHists');
      console.log(this.consumosHistsList);
    }, error => {
      console.log('fallo el call de la API getConsumosHists');
      console.log(error);
    });
  }
  getHistPersos1() {
    this.mainService.getHistPersos1().subscribe( data => {
      this.histPerso1List = data;
      console.log('call API getHistPersos1');
      console.log(this.histPerso1List);
    }, error => {
      console.log('fallo el call de la API getHistPersos1');
      console.log(error);
    });
  }

}
