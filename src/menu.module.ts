import { NgModule } from '@angular/core';

import { KaiuMenuService } from './menu.service';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  exports: [],
  providers: [
    KaiuMenuService,
  ],
})
export class KaiuMenuModule {}
