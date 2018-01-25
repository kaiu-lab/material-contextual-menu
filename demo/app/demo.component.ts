import { Component, DoCheck, HostListener, ViewContainerRef } from '@angular/core';
import { KaiuMenuService } from '@kaiu/material-contextual-menu';
import { MenuAComponent } from './menu-a.component';
import { MenuBComponent } from './menu-b.component';

@Component({
  selector: 'demo-root',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css'],
})
export class DemoComponent implements DoCheck {

  @HostListener('contextmenu', ['$event']) onContextMenu(event: MouseEvent) {
    event.preventDefault();
    if (event.clientY > 300) {
      this._menuService.openMenu(MenuBComponent, { x: event.clientX, y: event.clientY }, this._viewContainerRef);
    } else {
      this._menuService.openMenu(MenuAComponent, { x: event.clientX, y: event.clientY }, this._viewContainerRef);
    }
  }

  @HostListener('click') onClick() {
    this._menuService.closeAll();
  }

  constructor(private _menuService: KaiuMenuService, private _viewContainerRef: ViewContainerRef) {
  }

  ngDoCheck(): void {
    console.log('do check');
  }
}
