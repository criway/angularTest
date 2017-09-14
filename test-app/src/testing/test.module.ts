import {NgModule} from "@angular/core";
import { HttpStubs } from "./http.stubs";
import { MainBarStubComponent } from "./main-bar-stubs";
import { RouterOutletStubsComponent} from "./router-outlet-stubs";

@NgModule({
  declarations: [
    HttpStubs,
    MainBarStubComponent,
    RouterOutletStubsComponent
  ],
})

export class TestModule{}