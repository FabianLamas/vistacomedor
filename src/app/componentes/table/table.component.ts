import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MainService } from 'src/app/servicios/main.service';

const Consumos = [
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

  consumosList: any[];
  consumosHistsList: any[];
  histPerso1List: any[];

@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
@ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private mainService: MainService) {}

  ngOnInit() {
    this.getConsumos();
    this.getConsumosHists();
    this.getHistPersos1();
    this.armarGrilla();
  }

  armarGrilla() {
    // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
    // this.dataSource = new MatTableDataSource(LISTA);
    this.dataSource = new MatTableDataSource(Consumos);
    // this.dataSource = new MatTableDataSource(users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
      console.log('call API getNonConformanceDocuments');
      console.log(this.histPerso1List);
    }, error => {
      console.log('fallo el call de la API getNonConformanceDocuments');
      console.log(error);
    });
  }

}
