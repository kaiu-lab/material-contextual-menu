import { Component, EventEmitter, ViewChild } from '@angular/core';
import { MenuContainer } from '@kaiu/material-contextual-menu';
import { MatMenu } from '@angular/material';

@Component({
  selector: 'demo-menu-a',
  template: `
      <mat-menu #mainMenu="matMenu">
          <button mat-menu-item [matMenuTriggerFor]="vertebrates">Vertebrates</button>
          <button mat-menu-item [matMenuTriggerFor]="invertebrates">Invertebrates</button>
      </mat-menu>

      <mat-menu #vertebrates="matMenu">
          <button mat-menu-item [matMenuTriggerFor]="fish">Fishes</button>
          <button mat-menu-item [matMenuTriggerFor]="amphibians">Amphibians</button>
          <button mat-menu-item [matMenuTriggerFor]="reptiles">Reptiles</button>
          <button mat-menu-item (click)="choose.emit('Bird')">Birds</button>
          <button mat-menu-item (click)="choose.emit('Mammal')">Mammals</button>
      </mat-menu>

      <mat-menu #invertebrates="matMenu">
          <button mat-menu-item (click)="choose.emit('Insect')">Insects</button>
          <button mat-menu-item (click)="choose.emit('Mollusc')">Molluscs</button>
          <button mat-menu-item (click)="choose.emit('Crustacean')">Crustaceans</button>
          <button mat-menu-item (click)="choose.emit('Coral')">Corals</button>
          <button mat-menu-item (click)="choose.emit('Arachnid')">Arachnids</button>
          <button mat-menu-item (click)="choose.emit('Velvet')">Velvet worms</button>
          <button mat-menu-item (click)="choose.emit('Horseshoe')">Horseshoe crabs</button>
      </mat-menu>

      <mat-menu #fish="matMenu">
          <button mat-menu-item (click)="choose.emit('Baikal')">Baikal oilfish</button>
          <button mat-menu-item (click)="choose.emit('Bala')">Bala shark</button>
          <button mat-menu-item (click)="choose.emit('Ballan')">Ballan wrasse</button>
          <button mat-menu-item (click)="choose.emit('Bamboo')">Bamboo shark</button>
          <button mat-menu-item (click)="choose.emit('Banded')">Banded killifish</button>
      </mat-menu>

      <mat-menu #amphibians="matMenu">
          <button mat-menu-item (click)="choose.emit('Sonoran')">Sonoran desert toad</button>
          <button mat-menu-item (click)="choose.emit('Western')">Western toad</button>
          <button mat-menu-item (click)="choose.emit('Arroyo')">Arroyo toad</button>
          <button mat-menu-item (click)="choose.emit('Yosemite')">Yosemite toad</button>
      </mat-menu>

      <mat-menu #reptiles="matMenu">
          <button mat-menu-item (click)="choose.emit('Banded')">Banded Day Gecko</button>
          <button mat-menu-item (click)="choose.emit('Banded')">Banded Gila Monster</button>
          <button mat-menu-item (click)="choose.emit('Black')">Black Tree Monitor</button>
          <button mat-menu-item (click)="choose.emit('Blue')">Blue Spiny Lizard</button>
          <button mat-menu-item disabled>Velociraptor</button>
      </mat-menu>
  `,
  styles: []
})
export class MenuAComponent implements MenuContainer {

  @ViewChild('mainMenu') matMenu: MatMenu;

  choose = new EventEmitter<string>();

}
