import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MdMenuModule, MdIconModule } from '@angular/material';
import { Md2MenuModule } from 'md2-menu/menu';

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

import { IncidentsComponent } from './incidents/incidents.component';
import { IncidentDetailComponent } from './incidents/incident-detail.component';

const appRoutes: Routes = [
  { path: 'incidents', component: IncidentsComponent },
  { path: 'detail/:id', component: IncidentDetailComponent },
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
    IncidentDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
	  MdMenuModule,
    Md2MenuModule,
    MdIconModule,
    RouterModule.forRoot(
        appRoutes,
        {enableTracing: true}
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
