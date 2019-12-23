import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './componentes/toolbar/toolbar.component';
import { TableComponent } from './componentes/table/table.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import {MatDividerModule} from '@angular/material/divider';

import {DatePipe} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    HttpClientModule,
    MatDividerModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
