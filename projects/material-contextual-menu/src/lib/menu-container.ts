import { MatMenu } from '@angular/material/menu';
import { Observable } from 'rxjs';

/**
 * The contract that a menu container component must follow so it can be used by the {@link KaiuMenuService}.
 */
export interface KaiuMenuContainer<R = any> {

  /** A public reference to a MatMenu component. */
  matMenu: MatMenu;

  /** An observable that emits when the user select a menu item. */
  select: Observable<R>;
}
