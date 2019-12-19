import { Component, OnInit } from '@angular/core';
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

import * as _moment from 'moment';

import {default as _rollupMoment} from 'moment';

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
  ],
})

export class ToolbarComponent implements OnInit {
  date1 = new FormControl(new Date());
  date2 = new FormControl(new Date());
  dateValidate1 = new FormControl('', [Validators.required, Validators.email]);
  dateValidate2 = new FormControl('', [Validators.required, Validators.email]);
  serializedDate = new FormControl((new Date()).toISOString());
  constructor() { }

  ngOnInit() {
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
