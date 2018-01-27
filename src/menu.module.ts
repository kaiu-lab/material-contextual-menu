import { NgModule } from '@angular/core';

import { KaiuMenuService } from './menu.service';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  exports: [
      MatMenuModule,
  ],
  providers: [
    KaiuMenuService,
  ],
})
export class KaiuMenuModule {}
