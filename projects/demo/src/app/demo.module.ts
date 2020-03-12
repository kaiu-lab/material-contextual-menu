import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { KaiuMenuModule } from "@kaiu/material-contextual-menu";

import { DemoComponent } from './demo.component';
import { MenuAComponent } from "./menu-a.component";
import { MenuBComponent } from "./menu-b.component";

@NgModule({
  declarations: [
    DemoComponent,
    MenuAComponent,
    MenuBComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    KaiuMenuModule,
  ],
  providers: [],
  bootstrap: [DemoComponent]
})
export class DemoModule { }
