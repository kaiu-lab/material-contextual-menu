import { ComponentFactoryResolver, ComponentRef, Injectable, Optional, Type, ViewContainerRef, } from '@angular/core';
import { KaiuMenuRef } from './menu-ref';
import { MenuPosition } from './menu-position';
import { MenuContainer } from './menu-container';
import { GlobalPositionStrategy, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatMenu } from '@angular/material';

@Injectable()
export class KaiuMenuService {

  /** List of all opened menus. */
  openMenus: KaiuMenuRef<MenuContainer>[] = [];

  /** The text direction of the containing app. */
  get dir(): Direction {
    return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
  }

  constructor(
      private _overlay: Overlay,
      private _resolver: ComponentFactoryResolver,
      @Optional() private _dir: Directionality) {}

  /** Opens a menu. */
  openMenu<T extends MenuContainer>(
      menuContainer: Type<T>, position: MenuPosition, viewContainerRef: ViewContainerRef): KaiuMenuRef<T> {

    // Close all previously opened menus.
    this.closeAll();

    const menuRef = this._createMenu(menuContainer, position, viewContainerRef);

    this._registerMenuRef(menuRef);

    return menuRef;
  }

  private _createMenu<T extends MenuContainer>(
      menuContainer: Type<T>, position: MenuPosition, viewContainerRef: ViewContainerRef): KaiuMenuRef<T> {
    const overlayRef = this._createOverlay(position);
    const containerRef = this._createMenuContainer(menuContainer, viewContainerRef);

    const menuRef = new KaiuMenuRef<T>(overlayRef, containerRef);

    const portal = this._createPortal(containerRef.instance, viewContainerRef);
    overlayRef.attach(portal);

    this._initMenu(overlayRef, containerRef.instance.matMenu);

    return menuRef;
  }

  /**
   * Manage the list of opened menus.
   */
  private _registerMenuRef(menuRef: KaiuMenuRef<any>): void {
    this.openMenus.push(menuRef);

    menuRef.afterClosed.subscribe(() => {
      const menuIdx = this.openMenus.indexOf(menuRef);
      if (menuIdx !== -1) { this.openMenus.splice(menuIdx, 1); }
    });
  }

  /**
   * This method sets the menu state to open and focuses the first item if
   * the menu was opened via the keyboard.
   */
  private _initMenu(overlayRef: OverlayRef, matMenu: MatMenu): void {
    matMenu.direction = this.dir;
    matMenu.xPosition = 'after';
    matMenu.yPosition = 'below';
    matMenu.setElevation(0);

    const rootNode = overlayRef.overlayElement.firstElementChild as HTMLElement;
    if (rootNode) {
      matMenu.resetActiveItem();
      // I don't really know wjy, but we have to wait the next VM turn to set the focus.
      setTimeout(() => {
        rootNode.focus();
      });
    }

  }

  private _createOverlay(position: MenuPosition): OverlayRef {
    const config = this._getOverlayConfig(position);
    return this._overlay.create(config);
  }

  private _createPortal(menuContainer: MenuContainer, viewContainerRef: ViewContainerRef): TemplatePortal<any> {
    return new TemplatePortal(menuContainer.matMenu.templateRef, viewContainerRef);
  }

  /**
   * This method builds the configuration object needed to create the overlay.
   */
  private _getOverlayConfig(position: MenuPosition): OverlayConfig {
    return new OverlayConfig({
      positionStrategy: this._getPosition(position),
      direction: this.dir,
    });
  }

  /**
   * This method builds the position strategy for the overlay, so the menu is properly display next to the cursor.
   */
  private _getPosition(position: MenuPosition): GlobalPositionStrategy {
    return this._overlay.position().global().left(position.x + 'px').top(position.y + 'px');
  }

  private _createMenuContainer<T extends MenuContainer>(
      menuContainer: Type<T>, viewContainerRef: ViewContainerRef): ComponentRef<T> {
    const factory = this._resolver.resolveComponentFactory(menuContainer);
    const containerRef = viewContainerRef.createComponent(factory);
    containerRef.changeDetectorRef.detectChanges();

    return containerRef;
  }

  /**
   * Closes all of the currently-open menus.
   */
  closeAll(): void {
    let i = this.openMenus.length;

    while (i--) {
      // The `_openMenus` property isn't updated after close until the rxjs subscription
      // runs on the next microtask, in addition to modifying the array as we're going
      // through it. We loop through all of them and call close without assuming that
      // they'll be removed from the list instantaneously.
      this.openMenus[i].close();
    }
  }

}
