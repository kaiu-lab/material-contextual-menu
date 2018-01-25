import { Component, ViewChild } from '@angular/core';
import { MenuContainer } from '@kaiu/material-contextual-menu';
import { MatMenu } from '@angular/material';

@Component({
  selector: 'demo-menu-b',
  template: `
      <mat-menu #mainMenu="matMenu">
          <button mat-menu-item [matMenuTriggerFor]="felin">Felin</button>
          <button mat-menu-item [matMenuTriggerFor]="doggo">Doggo</button>
      </mat-menu>

      <mat-menu #felin="matMenu">
          <button mat-menu-item>Cat</button>
          <button mat-menu-item>Lion</button>
          <button mat-menu-item>Tiger</button>
      </mat-menu>

      <mat-menu #doggo="matMenu">
          <button mat-menu-item>Waf</button>
          <button mat-menu-item>Wouf</button>
      </mat-menu>
      
  `,
  styles: []
})
export class MenuBComponent implements MenuContainer {

  @ViewChild('mainMenu') matMenu: MatMenu;

}
