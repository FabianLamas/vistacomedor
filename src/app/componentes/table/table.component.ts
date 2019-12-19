import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;

}

const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

const LISTA = [
  { id: 1, name: 'Theodore', progress: 53, color: 'Violet', fruta: 'pera1' },
  { id: 2, name: 'Charlotte', progress: 52, color: 'purple', fruta: 'pera2' },
  { id: 3, name: 'Atticus', progress: 51, color: 'gray', fruta: 'pera3' },
  { id: 4, name: 'Jasper', progress: 56, color: 'teal', fruta: 'pera4' },
  { id: 5, name: 'Amelia', progress: 59, color: 'gray', fruta: 'pera5' },
  { id: 6, name: 'Cora', progress: 59, color: 'maroon', fruta: 'pera6' },
  { id: 7, name: 'Amelia', progress: 53, color: 'lime', fruta: 'pera7' },
  { id: 8, name: 'Jack', progress: 34, color: 'olive', fruta: 'pera8' },
  { id: 11, name: 'Asher', progress: 24, color: 'Violet', fruta: 'pera9' },
  { id: 10, name: 'Elizabeth', progress: 55, color: 'blue', fruta: 'pera0' },
  { id: 19, name: 'Olivia', progress: 62, color: 'blue', fruta: 'pera22' },
  { id: 17, name: 'Isabella', progress: 46, color: 'maroon', fruta: 'pera13' },
  { id: 12, name: 'Maia', progress: 76, color: 'navy', fruta: 'pera12' }
];


const ELEMENTOS = [
  {auditNumber: "U.Op. Depositos de terceros - Ene 2010", estadoActual: "En proceso", number: 2, author: "Fabian Lamas", creationStamp: "2010-016:49:28", answerType: "_Corrective_Text", dias: 5, origenPlanMejora: "Reclamos clientes", responsible: "AR00022750", sabor: "Naranja", sector: "1e75f2f7-501f-4b9e-a8ba-8ebf4abbf061", size: "   ", topic: "2204d9d7-1bc6-4a5b-b19d-3e47915970ec" },
  {auditNumber: "Auditoria de Seguimeinto ISO 9001", estadoActual: "En proceso", number: 4, author: "Fabian Lamas", creationStamp: "2010-01-0:22", answerType: "_Corrective_Text", dias: 5, origenPlanMejora: "Reclamos clientes", responsible: "AR00022750", sabor: "Naranja", sector: "1e75f2f7-501f-4b9e-a8ba-8ebf4abbf061", size: "   ", topic: "2204d9d7-1bc6-4a5b-b19d-3e47915970ec"},
  {auditNumber: "Auditoria de Seguimeinto ISO 9001", estadoActual: "En proceso", number: 5, author: "Fabian Lamas", creationStamp: "2010-01-25T08:42:18", answerType: "_Corrective_Text", dias: 5, origenPlanMejora: "Reclamos clientes", responsible: "AR00022750", sabor: "Naranja", sector: "1e75f2f7-501f-4b9e-a8ba-8ebf4abbf061", size: "   ", topic: "2204d9d7-1bc6-4a5b-b19d-3e47915970ec"},
  {auditNumber: "Auditoria de Seguimeinto ISO 9001", estadoActual: "En proceso", number: 6, author: "Fabian Lamas", creationStamp: "2010-01-25T08:49:46",  answerType: "_Corrective_Text", dias: 5, origenPlanMejora: "Reclamos clientes", responsible: "AR00022750", sabor: "Naranja", sector: "1e75f2f7-501f-4b9e-a8ba-8ebf4abbf061", size: "   ", topic: "2204d9d7-1bc6-4a5b-b19d-3e47915970ec"},
  {auditNumber: "09/2010", estadoActual: "En proceso", number: 199, author: "Fabian Lamas", creationStamp: "2010-06-16T14:59:39",  answerType: "_Corrective_Text", dias: 5, origenPlanMejora: "Reclamos clientes", responsible: "AR00022750", sabor: "Naranja", sector: "1e75f2f7-501f-4b9e-a8ba-8ebf4abbf061", size: "   ", topic: "2204d9d7-1bc6-4a5b-b19d-3e47915970ec"},
  {auditNumber: "06/2012 - Mantenimiento", estadoActual: "En proceso", number: 812, author: "Fabian Lamas", creationStamp: "2012-06-27T12:18:58", answerType: "_Corrective_Text", dias: 5, origenPlanMejora: "Reclamos clientes", responsible: "AR00022750", sabor: "Naranja", sector: "1e75f2f7-501f-4b9e-a8ba-8ebf4abbf061", size: "   ", topic: "2204d9d7-1bc6-4a5b-b19d-3e47915970ec"},
  {auditNumber: "17/2012 - Inocuidad y Calidad Alcorta", estadoActual: "En proceso", number: 942, author: "Fabian Lamas", creationStamp: "2012-11-16T11:05:27",  answerType: "_Corrective_Text", dias: 5, origenPlanMejora: "Reclamos clientes", responsible: "AR00022750", sabor: "Naranja", sector: "1e75f2f7-501f-4b9e-a8ba-8ebf4abbf061", size: "   ", topic: "2204d9d7-1bc6-4a5b-b19d-3e47915970ec"},
  {auditNumber: "AI 190 (Control de línea y Materias Primas)", estadoActual: "En proceso", number: 152, author: "Fabian Lamas", creationStamp: "2010-05-10T15:03:01",  answerType: "_Corrective_Text", dias: 5, origenPlanMejora: "Reclamos clientes", responsible: "AR00022750", sabor: "Naranja", sector: "1e75f2f7-501f-4b9e-a8ba-8ebf4abbf061", size: "   ", topic: "2204d9d7-1bc6-4a5b-b19d-3e47915970ec"},
  {auditNumber: "Q1 2010", estadoActual: "En proceso", number: 310, author: "Fabian Lamas", creationStamp: "2010-09-02T16:37:06",  answerType: "_Corrective_Text", dias: 5, origenPlanMejora: "Reclamos clientes", responsible: "AR00022750", sabor: "Naranja", sector: "1e75f2f7-501f-4b9e-a8ba-8ebf4abbf061", size: "   ", topic: "2204d9d7-1bc6-4a5b-b19d-3e47915970ec"},
  {auditNumber: "06/2010", estadoActual: "En proceso", number: 179, author: "Fabian Lamas", creationStamp: "2010-05-27T10:20:27",  answerType: "_Corrective_Text", dias: 5, origenPlanMejora: "Reclamos clientes", responsible: "AR00022750", sabor: "Naranja", sector: "1e75f2f7-501f-4b9e-a8ba-8ebf4abbf061", size: "   ", topic: "2204d9d7-1bc6-4a5b-b19d-3e47915970ec"},
  {auditNumber: "U.Op. Depositos de terceros - Ene 2010", estadoActual: "En proceso", number: 2, author: "Fabian Lamas", creationStamp: "2010-016:49:28", answerType: "_Corrective_Text", dias: 5, origenPlanMejora: "Reclamos clientes", responsible: "AR00022750", sabor: "Naranja", sector: "1e75f2f7-501f-4b9e-a8ba-8ebf4abbf061", size: "   ", topic: "2204d9d7-1bc6-4a5b-b19d-3e47915970ec" },
  {auditNumber: "Auditoria de Seguimeinto ISO 9001", estadoActual: "En proceso", number: 4, author: "Fabian Lamas", creationStamp: "2010-01-0:22", answerType: "_Corrective_Text", dias: 5, origenPlanMejora: "Reclamos clientes", responsible: "AR00022750", sabor: "Naranja", sector: "1e75f2f7-501f-4b9e-a8ba-8ebf4abbf061", size: "   ", topic: "2204d9d7-1bc6-4a5b-b19d-3e47915970ec"},
  {auditNumber: "Auditoria de Seguimeinto ISO 9001", estadoActual: "En proceso", number: 5, author: "Fabian Lamas", creationStamp: "2010-01-25T08:42:18", answerType: "_Corrective_Text", dias: 5, origenPlanMejora: "Reclamos clientes", responsible: "AR00022750", sabor: "Naranja", sector: "1e75f2f7-501f-4b9e-a8ba-8ebf4abbf061", size: "   ", topic: "2204d9d7-1bc6-4a5b-b19d-3e47915970ec"},
  {auditNumber: "Auditoria de Seguimeinto ISO 9001", estadoActual: "En proceso", number: 6, author: "Fabian Lamas", creationStamp: "2010-01-25T08:49:46",  answerType: "_Corrective_Text", dias: 5, origenPlanMejora: "Reclamos clientes", responsible: "AR00022750", sabor: "Naranja", sector: "1e75f2f7-501f-4b9e-a8ba-8ebf4abbf061", size: "   ", topic: "2204d9d7-1bc6-4a5b-b19d-3e47915970ec"},
  {auditNumber: "09/2010", estadoActual: "En proceso", number: 199, author: "Fabian Lamas", creationStamp: "2010-06-16T14:59:39",  answerType: "_Corrective_Text", dias: 5, origenPlanMejora: "Reclamos clientes", responsible: "AR00022750", sabor: "Naranja", sector: "1e75f2f7-501f-4b9e-a8ba-8ebf4abbf061", size: "   ", topic: "2204d9d7-1bc6-4a5b-b19d-3e47915970ec"},
  {auditNumber: "06/2012 - Mantenimiento", estadoActual: "En proceso", number: 812, author: "Fabian Lamas", creationStamp: "2012-06-27T12:18:58", answerType: "_Corrective_Text", dias: 5, origenPlanMejora: "Reclamos clientes", responsible: "AR00022750", sabor: "Naranja", sector: "1e75f2f7-501f-4b9e-a8ba-8ebf4abbf061", size: "   ", topic: "2204d9d7-1bc6-4a5b-b19d-3e47915970ec"},
  {auditNumber: "17/2012 - Inocuidad y Calidad Alcorta", estadoActual: "En proceso", number: 942, author: "Fabian Lamas", creationStamp: "2012-11-16T11:05:27",  answerType: "_Corrective_Text", dias: 5, origenPlanMejora: "Reclamos clientes", responsible: "AR00022750", sabor: "Naranja", sector: "1e75f2f7-501f-4b9e-a8ba-8ebf4abbf061", size: "   ", topic: "2204d9d7-1bc6-4a5b-b19d-3e47915970ec"},
  {auditNumber: "AI 190 (Control de línea y Materias Primas)", estadoActual: "En proceso", number: 152, author: "Fabian Lamas", creationStamp: "2010-05-10T15:03:01",  answerType: "_Corrective_Text", dias: 5, origenPlanMejora: "Reclamos clientes", responsible: "AR00022750", sabor: "Naranja", sector: "1e75f2f7-501f-4b9e-a8ba-8ebf4abbf061", size: "   ", topic: "2204d9d7-1bc6-4a5b-b19d-3e47915970ec"},
  {auditNumber: "Q1 2010", estadoActual: "En proceso", number: 310, author: "Fabian Lamas", creationStamp: "2010-09-02T16:37:06",  answerType: "_Corrective_Text", dias: 5, origenPlanMejora: "Reclamos clientes", responsible: "AR00022750", sabor: "Naranja", sector: "1e75f2f7-501f-4b9e-a8ba-8ebf4abbf061", size: "   ", topic: "2204d9d7-1bc6-4a5b-b19d-3e47915970ec"},
  {auditNumber: "06/2010", estadoActual: "En proceso", number: 179, author: "Fabian Lamas", creationStamp: "2010-05-27T10:20:27",  answerType: "_Corrective_Text", dias: 5, origenPlanMejora: "Reclamos clientes", responsible: "AR00022750", sabor: "Naranja", sector: "1e75f2f7-501f-4b9e-a8ba-8ebf4abbf061", size: "   ", topic: "2204d9d7-1bc6-4a5b-b19d-3e47915970ec"}
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
                                displayedColumns: string[] = [ 'auditNumber', 'estadoActual', 'number', 'author', 'creationStamp', 'answerType', 'dias',
                                'origenPlanMejora', 'responsible', 'sabor', 'sector', 'size', 'topic'];
dataSource: MatTableDataSource<any>;

@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
@ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() {}

  ngOnInit() {
    this.armarGrilla();
  }

  armarGrilla() {
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
    // this.dataSource = new MatTableDataSource(LISTA);
    this.dataSource = new MatTableDataSource(ELEMENTOS);
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

}

function createNewUser(id: number): UserData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}
