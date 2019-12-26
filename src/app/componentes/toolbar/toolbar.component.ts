import { Component, OnInit, LOCALE_ID } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {FormControl} from '@angular/forms';
import {Validators} from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
// import { LOCALE_ID } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { AppModule } from './';
import * as _moment from 'moment';

import {default as _rollupMoment} from 'moment';
import { formatDate, registerLocaleData } from '@angular/common';
import { DatePipe } from '@angular/common';

import localeEsAr from '@angular/common/locales/es-AR';
registerLocaleData(localeEsAr, 'es-AR');

import { TableComponent } from 'src/app/componentes/table/table.component';
import { MainService } from 'src/app/servicios/main.service';
const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    { provide: LOCALE_ID, useValue: 'es-AR' },
  ],
})

export class ToolbarComponent implements OnInit {
  // tableComponent = new TableComponent(this.mainService);
  date1 = new FormControl(new Date());
  date2 = new FormControl(new Date());
  dateValidate1 = new FormControl('', [Validators.required, Validators.email]);
  dateValidate2 = new FormControl('', [Validators.required, Validators.email]);
  serializedDate = new FormControl((new Date()).toISOString());
  desde: any;
  hasta: any;
  centrosCosto = [];
  consumosHistsList = [];

  constructor(private mainService: MainService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.getCentros();
  }

  getConsumosFiltrados() {
    this.mainService.buscarConsumos();
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

  getErrorMessage1() {
    return this.dateValidate1.hasError('required') ? 'Formato de fecha invalido' :
            '';
  }
  getErrorMessage2() {
    return this.dateValidate2.hasError('required') ? 'Formato de fecha invalido' :
            '';
  }
}
