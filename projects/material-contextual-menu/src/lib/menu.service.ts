import { ComponentFactoryResolver, ComponentRef, Injectable, Injector, Optional, Type, ViewContainerRef } from '@angular/core';
import { KaiuMenuRef } from './menu-ref';
import { MenuPosition } from './menu-position';
import { KaiuMenuContainer } from './menu-container';
import { GlobalPositionStrategy, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatMenu } from '@angular/material/menu';
import { KAIU_MENU_DATA } from './menu-injectors';

/**
 * Service to open Material Design absolute positioned menus.
 */
@Injectable()
export class KaiuMenuService {

  /** List of all opened menus. */
  openMenus: KaiuMenuRef<KaiuMenuContainer>[] = [];

  constructor(
      private _overlay: Overlay,
      private _resolver: ComponentFactoryResolver,
      private _injector: Injector,
      @Optional() private _dir: Directionality) {}

  /** Opens a menu. */
  openMenu<T extends KaiuMenuContainer, D = any>(
      menuContainer: Type<T>, position: MenuPosition, viewContainerRef: ViewContainerRef, data?: D): KaiuMenuRef<T> {

    // Close all previously opened menus.
    this.closeAll();

    const menuRef = this._createMenu(menuContainer, position, viewContainerRef, data);

    this._registerMenuRef(menuRef);

    return menuRef;
  }

  /**
   * Creates everything needed to show the menu and give access to a {@link KaiuMenuRef} referencing the new menu.
   */
  private _createMenu<T extends KaiuMenuContainer, D = any>(
      menuContainer: Type<T>, position: MenuPosition, viewContainerRef: ViewContainerRef, data?: D): KaiuMenuRef<T> {
    const overlayRef = this._createOverlay(position);
    const containerRef = this._createMenuContainer(menuContainer, viewContainerRef, data);

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

    menuRef.afterClosed().subscribe(() => {
      const menuIdx = this.openMenus.indexOf(menuRef);
      if (menuIdx !== -1) { this.openMenus.splice(menuIdx, 1); }
    });
  }

  /**
   * This method sets the menu state to open and focuses the first item if
   * the menu was opened via the keyboard.
   */
  private _initMenu(overlayRef: OverlayRef, matMenu: MatMenu): void {
    matMenu.direction = this.getDir();
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

  /** The text direction of the containing app. */
  private getDir(): Direction {
    return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
  }

  private _createOverlay(position: MenuPosition): OverlayRef {
    const config = this._getOverlayConfig(position);
    return this._overlay.create(config);
  }

  private _createPortal(menuContainer: KaiuMenuContainer, viewContainerRef: ViewContainerRef): TemplatePortal<any> {
    return new TemplatePortal(menuContainer.matMenu.templateRef, viewContainerRef);
  }

  /**
   * This method builds the configuration object needed to create the overlay.
   */
  private _getOverlayConfig(position: MenuPosition): OverlayConfig {
    return new OverlayConfig({
      positionStrategy: this._getPosition(position),
      direction: this.getDir(),
    });
  }

  /**
   * This method builds the position strategy for the overlay, so the menu is properly display next to the cursor.
   */
  private _getPosition(position: MenuPosition): GlobalPositionStrategy {
    return this._overlay.position().global().left(position.x + 'px').top(position.y + 'px');
  }

  /**
   * Creates the component that defines the menu.
   */
  private _createMenuContainer<T extends KaiuMenuContainer, D = any>(
      menuContainer: Type<T>, viewContainerRef: ViewContainerRef, data?: D): ComponentRef<T> {
    const factory = this._resolver.resolveComponentFactory(menuContainer);
    const injector = this._createInjector(viewContainerRef, data);
    const containerRef = viewContainerRef.createComponent(factory, undefined, injector);
    containerRef.changeDetectorRef.detectChanges();

    return containerRef;
  }

  /**
   * Creates a custom injector to be used inside the menu container.
   */
  private _createInjector<D = any>(viewContainerRef: ViewContainerRef, data?: D): Injector {
    const userInjector = viewContainerRef.injector || this._injector;

    return Injector.create({
      providers: [
        {
          provide: KAIU_MENU_DATA,
          useValue: data
        }
      ],
      parent: userInjector
    });
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
