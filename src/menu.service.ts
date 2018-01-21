import { ComponentFactoryResolver, ComponentRef, Injectable, Optional, Type, ViewContainerRef, } from '@angular/core';
import { KaiuMenuRef } from './menu-ref';
import { MenuPosition } from './menu-position';
import { MenuContainer } from './menu-container';
import { GlobalPositionStrategy, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatMenu } from '@angular/material';

/**
 * Material MatMenu does not provide a callback after its fade-out animation,
 * but we know that its animation takes 200ms.
 */
const MAT_FADE_OUT_TIME = 200;

@Injectable()
export class KaiuMenuService {

  private _openMenus: KaiuMenuRef<MenuContainer>[] = [];

  /** The text direction of the containing app. */
  get dir(): Direction {
    return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
  }

  constructor(
      private _overlay: Overlay,
      private _resolver: ComponentFactoryResolver,
      @Optional() private _dir: Directionality) {}

  openMenu<T extends MenuContainer>(
      menuContainer: Type<T>, position: MenuPosition, viewContainerRef: ViewContainerRef): KaiuMenuRef<T> {
    this.closeAll();

    const containerRef = this._createMenuContainer(menuContainer, viewContainerRef);

    const portal = this._createPortal(containerRef.instance, viewContainerRef);
    const overlayRef = this._createOverlay(position);

    overlayRef.attach(portal);

    containerRef.instance.matMenu._startAnimation();

    const menuRef = new KaiuMenuRef(overlayRef, containerRef.instance);

    containerRef.instance.matMenu.closed.subscribe(() => {
      this._destroyMenu(menuRef);
    });

    this._openMenus.push(menuRef);

    return menuRef;
  }

  /**
   * This method sets the menu state to open and focuses the first item if
   * the menu was opened via the keyboard.
   */
  private _initMenu(matMenu: MatMenu): void {
    matMenu.direction = this.dir;
    matMenu.xPosition = 'after';
    matMenu.yPosition = 'below';
    matMenu.setElevation(0);
    matMenu.resetActiveItem();
  }

  /**
   * This method creates the overlay from the provided menu's template and saves its
   * OverlayRef so that it can be attached to the DOM when openMenu is called.
   */
  private _createOverlay(position: MenuPosition): OverlayRef {
    const config = this._getOverlayConfig(position);
    return this._overlay.create(config);
  }

  private _createPortal(menuContainer: MenuContainer, viewContainerRef: ViewContainerRef): TemplatePortal<any> {
    return new TemplatePortal(menuContainer.matMenu.templateRef, viewContainerRef);
  }

  /**
   * This method builds the configuration object needed to create the overlay, the OverlayState.
   * @returns OverlayConfig
   */
  private _getOverlayConfig(position: MenuPosition): OverlayConfig {
    return new OverlayConfig({
      positionStrategy: this._getPosition(position),
      direction: this.dir,
    });
  }

  /**
   * This method builds the position strategy for the overlay, so the menu is properly display next to the cursor.
   * @returns GlobalPositionStrategy
   */
  private _getPosition(position: MenuPosition): GlobalPositionStrategy {
    return this._overlay.position().global().left(position.x + 'px').top(position.y + 'px');
  }

  private _createMenuContainer(
      menuContainer: Type<MenuContainer>, viewContainerRef: ViewContainerRef): ComponentRef<MenuContainer> {
    const factory = this._resolver.resolveComponentFactory(menuContainer);
    const containerRef = viewContainerRef.createComponent(factory);
    containerRef.changeDetectorRef.detectChanges();

    this._initMenu(containerRef.instance.matMenu);
    return containerRef;
  }

  /**
   * Closes all of the currently-open menus.
   */
  closeAll(): void {
    let i = this._openMenus.length;

    while (i--) {
      // The `_openMenus` property isn't updated after close until the rxjs subscription
      // runs on the next microtask, in addition to modifying the array as we're going
      // through it. We loop through all of them and call close without assuming that
      // they'll be removed from the list instantaneously.
      this._openMenus[i].close();
    }
  }

  /** Closes the menu and does the necessary cleanup. */
  private _destroyMenu(menuRef: KaiuMenuRef<any>) {
    // this._closeSubscription.unsubscribe();
    menuRef.overlayRef.detach();

    menuRef.containerRef.matMenu._resetAnimation();
    setTimeout(() => {
      menuRef.overlayRef.dispose();
    }, 200);
  }
}
