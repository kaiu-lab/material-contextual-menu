import { MenuContainer } from './menu-container';
import { OverlayRef } from '@angular/cdk/overlay';

export class KaiuMenuRef<T> {

  get overlayRef(): OverlayRef {
    return this._overlayRef;
  }

  get containerRef(): MenuContainer {
    return this._containerRef;
  }

  constructor(private _overlayRef: OverlayRef, private _containerRef: MenuContainer) {}

  /**
   * Close the menu.
   */
  close(): void {

    this._containerRef.matMenu.closed.emit();

  }

}
