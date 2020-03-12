import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { KaiuMenuService } from './menu.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    MatMenuModule,
  ],
  providers: [
    KaiuMenuService,
  ]
})
export class KaiuMenuModule { }
