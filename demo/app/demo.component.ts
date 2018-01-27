import { Component, DoCheck, HostListener, OnDestroy, ViewContainerRef } from '@angular/core';
import { KaiuMenuService } from '@kaiu/material-contextual-menu';
import { MenuAComponent } from './menu-a.component';
import { MenuBComponent } from './menu-b.component';
import { takeUntil } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'demo-root',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css'],
})
export class DemoComponent implements DoCheck, OnDestroy {

  private _onDestroy$ = new Subject<void>();

  @HostListener('contextmenu', ['$event']) onContextMenu(event: MouseEvent) {
    event.preventDefault();
    if (event.clientY < 300) {
      this._openA(event.clientX, event.clientY);
    } else {
      this._openB(event.clientX, event.clientY);
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

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._menuService.closeAll();
  }

  private _openA(x: number, y: number) {
    const menuA = this._menuService.openMenu(MenuAComponent, { x, y }, this._viewContainerRef);

    menuA.menuContainer.choose.pipe(
        takeUntil(merge(this._onDestroy$, menuA.afterClosed)),
    ).subscribe((value) => {
      console.log('clicked A', value);
    });
  }

  private _openB(x: number, y: number) {
    const menuB = this._menuService.openMenu(MenuBComponent, { x, y }, this._viewContainerRef);

    menuB.menuContainer.select.pipe(
        takeUntil(merge(this._onDestroy$, menuB.afterClosed)),
    ).subscribe((value) => {
      console.log('clicked B', value);
    });
  }
}
