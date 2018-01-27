import { NgModule } from '@angular/core';
import { DemoComponent } from './demo.component';
import { KaiuMenuModule } from '@kaiu/material-contextual-menu';
import { MenuAComponent } from './menu-a.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuBComponent } from './menu-b.component';

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
  bootstrap: [DemoComponent],
  entryComponents: [MenuAComponent, MenuBComponent],
})
export class DemoModule {}
