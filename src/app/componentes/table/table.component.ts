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
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  displayedColumns: string[] = ['numero_tarjeta','nombre','centroCosto','numero_turno','fecha_Consumo','hora'];
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
  dateNow = new Date();
  fileName = 'ReporteConsumos.xlsx';

@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
@ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private mainService: MainService) {
    if (this.mainService.subsVar==undefined) {
      this.mainService.subsVar = this.mainService.invokeBuscarFunction.subscribe((name:string) => {    
        this.getConsumosFiltrados("","", null);
      });
    }
  }

  ngOnInit() {
    this.getConsumosMesActual();
  }

  armarGrilla() {
    this.dataSource = new MatTableDataSource(this.histPerso1List);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getConsumosMesActual() {

    this.dateNow = new Date;

    var lastday = function(y,m) {
      return  new Date(y, m + 1 , 0).getDate();
    }
    
    var startDate = '01';
    var endDate = lastday(this.dateNow.getFullYear(), this.dateNow.getMonth());
    var mes = this.dateNow.getMonth() + 1;
    var año = this.dateNow.getFullYear().toString();
    console.log(año.toString() + mes.toString() + startDate.toString(), año.toString() + mes.toString() + endDate.toString());

    this.mainService.getConsumos(año.toString() + mes.toString() + startDate.toString(), año.toString() + mes.toString() + endDate.toString(), null).subscribe( data => {
      this.histPerso1List = data;
      console.log('call API getConsumosMesActual');
      console.log(this.histPerso1List);
      this.armarGrilla();
    }, error => {
      console.log('fallo el call de la API getConsumosMesActual');
      console.log(error);
    });
  }

  getConsumosFiltrados(desde: string, hasta: string, centro?: string) {

    var _desde = (<HTMLInputElement>document.getElementById("desdeInput")).value;
    desde = this.reformateDate(_desde);

    var _hasta = (<HTMLInputElement>document.getElementById("hastaInput")).value;
    hasta = this.reformateDate(_hasta);

    if(centro != null){
      var centro = (<HTMLInputElement>document.getElementById("centro")).value;
    }

    this.mainService.getConsumos(desde, hasta, centro).subscribe( data => {
      this.histPerso1List = data;
      console.log('call API getConsumosFiltrados');
      console.log(this.histPerso1List);
      this.armarGrilla();
    }, error => {
      console.log('fallo el call de la API getConsumosFiltrados');
      console.log(error);
    });
  }

  reformateDate(pickerDate: string){
    var reformatedDate = pickerDate.split("/").reverse().join("");
    return reformatedDate;
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

  exportexcel(): void {
    let element = document.getElementById('excel-table'); 
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.fileName);
  }
}


  

  // hideSearch() {
  //   this.show = false;
  //   }
  // showSearch() {
  //   this.show = true;
  //   if (this.show && this.filtro) {
  //   this.show = false;
  //   }
  //   }

  // applyFilter(filterValue: string) {
  //   this.filtro = true;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (filterValue === '') {
  //     this.filtro = false;
  //   }

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
