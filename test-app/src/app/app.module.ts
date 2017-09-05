import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MdMenuModule, MdIconModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { AgGridModule } from 'ag-grid-angular/main';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MenuComponent } from './ts/menu.component';
import { PageContainerComponent } from './ts/page-container.component';
import { MainBarComponent } from './ts/main-bar.component';
import { PageDisplayComponent } from './ts/page-display.component';
import { Widget1Component } from './ts/widget1.component';
import { Widget2Component } from './ts/widget2.component';
import { Widget3Component } from './ts/widget3.component';
import { Widget4Component } from './ts/widget4.component';

import { IncidentService } from './incidents/services/incident.service';

import { IncidentsComponent } from './incidents/incidents.component';
import { IncidentDetailComponent } from './incidents/incident-detail.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeDetailComponent} from './employees/employee-detail.component';
import { GridPlaygroundComponent } from './gridplayground/grid-playground.component';
import { GridPageComponent } from './gridplayground/grid-page.component';

const appRoutes: Routes = [
  { path: 'incidents', component: IncidentsComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'detail/:id', component: IncidentDetailComponent },
  { path: 'employee-detail/:id', component: EmployeeDetailComponent },
  { path: 'grid-playground', component: GridPageComponent },
  { path: '**', component: PageContainerComponent}
];

@NgModule({
  declarations: [
    AppComponent,
	  MenuComponent,
	  PageContainerComponent,
    MainBarComponent,
    PageDisplayComponent,
    Widget1Component,
    Widget2Component,
    Widget3Component,
    Widget4Component,
    IncidentsComponent,
    IncidentDetailComponent,
    EmployeesComponent,
    EmployeeDetailComponent,
    GridPlaygroundComponent,
    GridPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
	  MdMenuModule,
    MdIconModule,
    HttpModule,
    AgGridModule.withComponents([]),
    RouterModule.forRoot(
        appRoutes,
        {enableTracing: true}
    )
  ],
  providers: [ IncidentService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
