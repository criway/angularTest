import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MdMenuModule } from '@angular/material';

import { AppComponent } from './app.component';
import { MenuComponent } from './ts/menu.component';
import { PageContainerComponent } from './ts/page-container.component';


@NgModule({
  declarations: [
    AppComponent,
		MenuComponent,
		PageContainerComponent
  ],
  imports: [
    BrowserModule,
		BrowserAnimationsModule,
		MdMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
