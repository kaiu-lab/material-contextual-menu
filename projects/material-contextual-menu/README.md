# Kaiu - Material contextual menu

This package provide an `@angular/material` compatible contextual menu.
It is heavily based on the already existing `MatMenu` and use a new service inspired
by the Material `DialogService`.

## Getting started

### Install the NPM package

```sh
npm install --save @kaiu/material-contextual-menu
```

### Declare a `KaiuMenuContainer`

```typescript
import { KaiuMenuContainer } from '@kaiu/material-contextual-menu';

@Component({
  template: `
      <mat-menu #mainMenu="matMenu">
          <button mat-menu-item (click)="select.emit('foo')">Foo</button>
          <button mat-menu-item (click)="select.emit('bar')">Bar</button>
          <button mat-menu-item [matMenuTriggerFor]="subMenu">Others</button>
      </mat-menu>

      <mat-menu #subMenu="matMenu">
          <button mat-menu-item (click)="select.emit({prop: 1})">First</button>
          <button mat-menu-item (click)="select.emit({prop: 2})">Second</button>
          <button mat-menu-item (click)="select.emit({prop: 3})">Third</button>
      </mat-menu>
  `,
})
export class ContextualMenuComponent implements KaiuMenuContainer {

  // To be a KaiuMenuContainer a component must...

  // ...give access to an inner MatMenu directive
  @ViewChild('mainMenu') matMenu: MatMenu;

  // ...and use an observable to communicate with the menu opener.
  select = new EventEmitter<string>();
}
```

### Import the module

```typescript
import { KaiuMenuModule } from '@kaiu/material-contextual-menu';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserAnimationsModule, // Or NoopAnimationsModule
    KaiuMenuModule, // The MatMenuModule is shipped with.
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
```

### Open the menu

```typescript
import { KaiuMenuService } from '@kaiu/material-contextual-menu';

@Component({
  selector: 'app-demo',
  template: `<h1>Hello world</h1>`,
})
export class DemoComponent {

  constructor(private menuService: KaiuMenuService, private viewContainerRef: ViewContainerRef) {}

  @HostListener('contextmenu', ['$event']) onContextMenu(event: MouseEvent) {
    // Prevent the browser native contextual menu.
    event.preventDefault();

    // Open a new ContextualMenuComponent at the cursor position.
    const menuRef = this.menuService.openMenu(
        ContextualMenuComponent,
        { x: event.clientX, y: event.clientY },
        this.viewContainerRef
    );

    // Listen for selected item in the menu.
    menuRef.afterClosed().subscribe((value) => {
      console.log('Menu closed with value: ', value);
    });
  }

  @HostListener('click') onClick() {
    // Close already opened menus when clicking outside a menu.
    this.menuService.closeAll();
  }
}
```

## Development

A demo application is provided, based on Angular CLI.

Run `npm start` and then go to `http://localhost:4200`.

## License

Everything in this repository is licensed under the MIT License unless otherwise specified.

Copyright (c) 2024 - Kaiu Lab
