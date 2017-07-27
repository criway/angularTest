import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MdMenuModule } from '@angular/material';
import { Md2MenuModule } from 'md2-menu/menu';

import { AppComponent } from './app.component';
import { MenuComponent } from './ts/menu.component';
import { PageContainerComponent } from './ts/page-container.component';
import { MainBarComponent } from "./ts/main-bar.component";
import { PageDisplayComponent } from "./ts/page-display.component";



@NgModule({
  declarations: [
    AppComponent,
	MenuComponent,
	PageContainerComponent,
    MainBarComponent,
    PageDisplayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
	MdMenuModule,
	Md2MenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
