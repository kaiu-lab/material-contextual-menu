import { MenuContainer } from './menu-container';
import { OverlayRef } from '@angular/cdk/overlay';
import { ComponentRef, EventEmitter } from '@angular/core';

/**
 * Material MatMenu does not provide a callback after its fade-out animation,
 * but we know that its animation takes 200ms.
 */
const MAT_FADE_OUT_TIME = 200;

export class KaiuMenuRef<T extends MenuContainer> {

  /** An observable that emits when menu is finished closing. */
  afterClosed = new EventEmitter<void>();

  /** The instance of the menu container component. */
  get menuContainer(): T {
    return this._menuContainerRef.instance;
  }

  constructor(private _overlayRef: OverlayRef, private _menuContainerRef: ComponentRef<T>) {
    _menuContainerRef.instance.matMenu._startAnimation();
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

  /** Closes the menu and does the necessary cleanup. */
  private _destroyMenu() {
    this._overlayRef.detach();
    this._menuContainerRef.instance.matMenu._resetAnimation();

    // MatMenu public API doesn't provide a way to subscribe to the animationEnd,
    // but we know the duration of the animation.
    setTimeout(() => {
      this._overlayRef.dispose();
      this._menuContainerRef.destroy();
      this.afterClosed.emit();
    }, MAT_FADE_OUT_TIME);
  }

}
