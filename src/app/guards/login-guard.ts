import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  CanActivateChildFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable, of, tap} from 'rxjs';
import {inject, Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class LoginGuard implements CanActivateChild {

  constructor(
    private router: Router
  ) {

  }


  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.router.navigate(['login'], {state: ['YOU ARE NOT LOGGED IN!']})
    return false;
  }

}

export const canActivateChildImpl: CanActivateChildFn = (route, state) => {
  const r = inject(Router);
  r.navigate(['aosdaskdsa'])
  return of(false).pipe(
    tap(() => r.navigate(['login']))
  );
}
