import { Component, EventEmitter, ViewChild } from '@angular/core';
import { KaiuMenuContainer } from '@kaiu/material-contextual-menu';
import { MatMenu } from '@angular/material/menu';

@Component({
  selector: 'demo-menu-b',
  template: `
      <mat-menu #mainMenu="matMenu">
          <button mat-menu-item [matMenuTriggerFor]="felin">Felin</button>
          <button mat-menu-item [matMenuTriggerFor]="doggo">Doggo</button>
      </mat-menu>

      <mat-menu #felin="matMenu">
          <button mat-menu-item (click)="select.emit('cat')">Cat</button>
          <button mat-menu-item (click)="select.emit('lion')">Lion</button>
          <button mat-menu-item (click)="select.emit('tiger')">Tiger</button>
      </mat-menu>

      <mat-menu #doggo="matMenu">
          <button mat-menu-item (click)="select.emit({sound: 'waf'})">Waf</button>
          <button mat-menu-item (click)="select.emit({sound: 'wouf'})">Wouf</button>
      </mat-menu>

  `,
  styles: [],
})
export class MenuBComponent implements KaiuMenuContainer {

  @ViewChild('mainMenu') matMenu: MatMenu;

  select = new EventEmitter<any>();
}
