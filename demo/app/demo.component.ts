import { Component, HostListener, ViewContainerRef } from '@angular/core';
import { KaiuMenuService } from '@kaiu/material-contextual-menu';
import { MenuAComponent } from './menu-a.component';

@Component({
  selector: 'demo-root',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css'],
})
export class DemoComponent {

  @HostListener('contextmenu', ['$event']) onContextMenu(event: MouseEvent) {
    event.preventDefault();
    this._menuService.openMenu(MenuAComponent, {x: event.clientX, y: event.clientY}, this._viewContainerRef);
  }

  @HostListener('click') onClick() {
    this._menuService.closeAll();
  }

  constructor(private _menuService: KaiuMenuService, private _viewContainerRef: ViewContainerRef) {
  }
}
