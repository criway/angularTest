import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {AppComponent} from './app.component';
import {MainBarStubComponent} from '../testing/main-bar-stubs';
import {RouterOutletStubsComponent} from '../testing/router-outlet-stubs';
import {findConfiguration} from "tslint/lib/configuration";

describe('AppComponent HTML elements', () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let appContainer: DebugElement;



  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent,
        MainBarStubComponent,
        RouterOutletStubsComponent], // declare the test component
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);

    comp = fixture.componentInstance; // BannerComponent test instance

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('h1'));
    appContainer = fixture.debugElement.query(By.css('.appContainer'));
    el = de.nativeElement;
  });

  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));


  it('div element appContainer', () => {
    expect(appContainer.nativeElement).toBeTruthy();
  });

  it('appContainer contains menu element', () => {
    const menuElement = appContainer.query(By.css('menu')).nativeElement;
    expect(menuElement).toBeTruthy();
  });

  it('appContainer contains main-bar element', () => {
    const mainBar = appContainer.query(By.css('main-bar')).nativeElement;
    expect(mainBar).toBeTruthy();
  });

  it('appContainer contains main-container div class', () => {
    const mainContainer = appContainer.query(By.css('.main-container')).nativeElement;
    expect(mainContainer).toBeTruthy();
  });

  it('appContainer contains router-outlet element', () => {
    const mainContainer = appContainer.query(By.css('router-outlet')).nativeElement;
    expect(mainContainer).toBeTruthy();
  });
});

describe('AppComponent attributes', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule( {
      declarations: [AppComponent,
        MainBarStubComponent,
        RouterOutletStubsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
  });

  it('title attribute is app', () => {
    expect(fixture.componentInstance.title).toEqual('app');
  });
});
