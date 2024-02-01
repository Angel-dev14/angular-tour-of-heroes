import {
  CanActivateChildFn, Router,
} from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable, tap } from 'rxjs';

export const authGuard: CanActivateChildFn = (route, state) => {
  console.log(route);
  const isPublic = route.data['public'] ?? false;
  if (isPublic) {
    // send another request
    return true;
  }
  const router = inject(Router);
  return inject(AuthService).login().pipe(
    tap((val) => {
      if (!val) {
        router.navigate([ 'access-denied' ]);
      }
    })
  );
}

interface CanDeactivateMyComponent {

  canDeactivateLogic(): boolean

}

// authGuards -> call some function that is shared accross all components
