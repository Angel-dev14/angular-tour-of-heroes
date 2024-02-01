import { ActivatedRouteSnapshot, CanDeactivate, CanDeactivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CanDeactivateMyComponent } from './can-deactivate-my-component';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class CanDeactivateGuard implements CanDeactivate<CanDeactivateMyComponent> {
  canDeactivate(component: CanDeactivateMyComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component?.canDeactivateLogic() ?? true;
  }

}

export const canDeactivateGuard: CanDeactivateFn<CanDeactivateMyComponent> = (component, currentRoute, currentState, nextState) => {
  return component.canDeactivateLogic();
}
