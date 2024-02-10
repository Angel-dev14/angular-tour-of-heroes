import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeroesComponent } from './heroes/heroes.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/authn-guard.service';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { canDeactivateGuard, CanDeactivateGuard } from './guards/can-deactivate-guard';
import { TodolistComponent } from './todolist/todolist.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'heroes',
        component: HeroesComponent,
        canDeactivate: [ canDeactivateGuard ]
      },
    ],
    canActivateChild: [ authGuard ],
    canDeactivate: [ CanDeactivateGuard ]
  },
  {
    path: 'todo',
    component: TodolistComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      bindToComponentInputs: true
    })
  ],
  providers: [ Router ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

}
