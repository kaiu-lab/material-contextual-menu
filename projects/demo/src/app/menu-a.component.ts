import { Component, EventEmitter, Inject, ViewChild } from '@angular/core';
import { KaiuMenuContainer, KAIU_MENU_DATA } from '@kaiu/material-contextual-menu';
import { MatMenu } from '@angular/material/menu';

export type AData = {value: any, label: string}[];

@Component({
  selector: 'demo-menu-a',
  template: `
      <mat-menu #mainMenu="matMenu">
          <button mat-menu-item [matMenuTriggerFor]="vertebrates">Vertebrates</button>
          <button mat-menu-item [matMenuTriggerFor]="invertebrates">Invertebrates</button>
          <button mat-menu-item [matMenuTriggerFor]="custom">Custom</button>
      </mat-menu>

      <mat-menu #custom="matMenu">
          <button *ngFor="let row of data" mat-menu-item (click)="select.emit(row.value)">{{row.label}}</button>
      </mat-menu>

      <mat-menu #vertebrates="matMenu">
          <button mat-menu-item [matMenuTriggerFor]="fish">Fishes</button>
          <button mat-menu-item [matMenuTriggerFor]="amphibians">Amphibians</button>
          <button mat-menu-item [matMenuTriggerFor]="reptiles">Reptiles</button>
          <button mat-menu-item (click)="select.emit('Bird')">Birds</button>
          <button mat-menu-item (click)="select.emit('Mammal')">Mammals</button>
      </mat-menu>

      <mat-menu #invertebrates="matMenu">
          <button mat-menu-item (click)="select.emit('Insect')">Insects</button>
          <button mat-menu-item (click)="select.emit('Mollusc')">Molluscs</button>
          <button mat-menu-item (click)="select.emit('Crustacean')">Crustaceans</button>
          <button mat-menu-item (click)="select.emit('Coral')">Corals</button>
          <button mat-menu-item (click)="select.emit('Arachnid')">Arachnids</button>
          <button mat-menu-item (click)="select.emit('Velvet')">Velvet worms</button>
          <button mat-menu-item (click)="select.emit('Horseshoe')">Horseshoe crabs</button>
      </mat-menu>

      <mat-menu #fish="matMenu">
          <button mat-menu-item (click)="select.emit('Baikal')">Baikal oilfish</button>
          <button mat-menu-item (click)="select.emit('Bala')">Bala shark</button>
          <button mat-menu-item (click)="select.emit('Ballan')">Ballan wrasse</button>
          <button mat-menu-item (click)="select.emit('Bamboo')">Bamboo shark</button>
          <button mat-menu-item (click)="select.emit('Banded')">Banded killifish</button>
      </mat-menu>

      <mat-menu #amphibians="matMenu">
          <button mat-menu-item (click)="select.emit('Sonoran')">Sonoran desert toad</button>
          <button mat-menu-item (click)="select.emit('Western')">Western toad</button>
          <button mat-menu-item (click)="select.emit('Arroyo')">Arroyo toad</button>
          <button mat-menu-item (click)="select.emit('Yosemite')">Yosemite toad</button>
      </mat-menu>

      <mat-menu #reptiles="matMenu">
          <button mat-menu-item (click)="select.emit('Banded')">Banded Day Gecko</button>
          <button mat-menu-item (click)="select.emit('Banded')">Banded Gila Monster</button>
          <button mat-menu-item (click)="select.emit('Black')">Black Tree Monitor</button>
          <button mat-menu-item (click)="select.emit('Blue')">Blue Spiny Lizard</button>
          <button mat-menu-item disabled>Velociraptor</button>
      </mat-menu>
  `,
  styles: [],
})
export class MenuAComponent implements KaiuMenuContainer<string> {

  @ViewChild('mainMenu') matMenu!: MatMenu;

  constructor(@Inject(KAIU_MENU_DATA) public data: AData) {}

  select = new EventEmitter<string>();

}
