import { Component, DoCheck, HostListener, OnDestroy, ViewContainerRef } from '@angular/core';
import { KaiuMenuService } from '@kaiu/material-contextual-menu';
import { AData, MenuAComponent } from './menu-a.component';
import { MenuBComponent } from './menu-b.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'demo-root',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css'],
})
export class DemoComponent implements DoCheck, OnDestroy {

  private _onDestroy$ = new Subject<void>();

  private _nbClicks = 0;

  @HostListener('contextmenu', ['$event']) onContextMenu(event: MouseEvent) {
    this._nbClicks++;
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
    const data: AData = [
      { label: 'First ' + this._nbClicks, value: { foo: 'bar', click: this._nbClicks } },
      { label: 'Second ' + this._nbClicks, value: 'hello' },
      { label: 'Third ' + this._nbClicks, value: [1, 2, 3, 4, 5] },
    ];
    this._menuService.openMenu<MenuAComponent, AData>(MenuAComponent, { x, y }, this._viewContainerRef, data)
        .afterClosed()
        .pipe(takeUntil(this._onDestroy$))
        .subscribe((value) => {
          if (value) {
            console.log('menu A closed with value: ', value);
          } else {
            console.log('menu A closed without value.');
          }
        });
  }

  private _openB(x: number, y: number) {
    this._menuService.openMenu(MenuBComponent, { x, y }, this._viewContainerRef).afterClosed()
        .pipe(takeUntil(this._onDestroy$))
        .subscribe((value) => {
          if (value) {
            console.log('menu B closed with value: ', value);
          } else {
            console.log('menu B closed without value.');
          }
        });
  }
}
