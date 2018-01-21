import { NgModule } from '@angular/core';
import { DemoComponent } from './demo.component';
import { KaiuMenuModule } from '@kaiu/material-contextual-menu';
import { MatMenuModule } from '@angular/material';
import { MenuAComponent } from './menu-a.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExpectedMenuComponent } from './expected-menu.component';

@NgModule({
  declarations: [
    DemoComponent,
    MenuAComponent,
    ExpectedMenuComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    MatMenuModule,
    KaiuMenuModule,
  ],
  providers: [],
  bootstrap: [DemoComponent],
  entryComponents: [MenuAComponent],
})
export class DemoModule {}
