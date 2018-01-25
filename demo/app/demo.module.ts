import { NgModule } from '@angular/core';
import { DemoComponent } from './demo.component';
import { KaiuMenuModule } from '@kaiu/material-contextual-menu';
import { MatMenuModule } from '@angular/material';
import { MenuAComponent } from './menu-a.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExpectedMenuComponent } from './expected-menu.component';
import { MenuBComponent } from './menu-b.component';

@NgModule({
  declarations: [
    DemoComponent,
    MenuAComponent,
    MenuBComponent,
    ExpectedMenuComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    MatMenuModule,
    KaiuMenuModule,
  ],
  providers: [],
  bootstrap: [DemoComponent],
  entryComponents: [MenuAComponent, MenuBComponent],
})
export class DemoModule {}
