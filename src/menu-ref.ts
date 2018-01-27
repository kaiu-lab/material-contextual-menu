import { KaiuMenuContainer } from './menu-container';
import { OverlayRef } from '@angular/cdk/overlay';
import { ComponentRef, EventEmitter } from '@angular/core';
import { map, take, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

/**
 * Material MatMenu does not provide a callback after its fade-out animation,
 * but we know that its animation takes 200ms.
 * @internal
 */
const MAT_FADE_OUT_TIME = 200;

/**
 * Reference to the menu opened via the {@link KaiuMenuService}.
 */
export class KaiuMenuRef<T extends KaiuMenuContainer<R>, R = any> {

  /** The instance of the menu container component. */
  get containerInstance(): T {
    return this._menuContainerRef.instance;
  }

  /** Result to be passed to afterClosed. */
  private _result: R | undefined;

  private _afterDestroy = new EventEmitter<void>();

  constructor(private _overlayRef: OverlayRef, private _menuContainerRef: ComponentRef<T>) {
    _menuContainerRef.instance.matMenu._startAnimation();

    // Listen for the first selected item.
    _menuContainerRef.instance.select.pipe(
        takeUntil(this._afterDestroy),
        take(1),
    ).subscribe((result) => {
      this._result = result;
    });

    _menuContainerRef.instance.matMenu.closed.subscribe(() => {
      this._destroyMenu();
    });
  }

  /**
   * Close the menu.
   */
  close(): void {
    this._menuContainerRef.instance.matMenu.closed.emit();
  }

  /** Gets an observable that emits when menu is finished closing. */
  afterClosed(): Observable<R | undefined> {
    return this._afterDestroy.pipe(map(() => this._result));
  }

  /** Closes the menu and does the necessary cleanup. */
  private _destroyMenu() {
    this._overlayRef.detach();
    this._menuContainerRef.instance.matMenu._resetAnimation();

    // MatMenu public API doesn't provide a way to subscribe to the animationEnd,
    // but we know the duration of the animation.
    setTimeout(() => {
      this._overlayRef.dispose();
      this._menuContainerRef.destroy();
      this._afterDestroy.emit();
    }, MAT_FADE_OUT_TIME);
  }

}
