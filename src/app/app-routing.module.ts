import {NgModule} from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {HeroesComponent} from './heroes/heroes.component';
import {HomeComponent} from './home/home.component';
import {HeroDetailsComponent} from './heroes/hero-details/hero-details.component';
import {RxjsMemoryLeakComponent} from './rxjs-memory-leak/rxjs-memory-leak.component';
import {LoginComponent} from './login/login.component';
import {canActivateChildImpl, LoginGuard} from './guards/login-guard';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'home', component: HomeComponent, children: [
      {
        path: 'heroes', component: HeroesComponent, children: [
          {
            path: ':id',
            component: HeroDetailsComponent
          }
        ]
      }, {
        path: 'news', loadChildren: () => import('./news/weather.module').then(m => m.WeatherModule)
      },
      {
        path: 'leak', component: RxjsMemoryLeakComponent,
      },
    ], canActivateChild: [canActivateChildImpl],
  },
  {
    path: '**', redirectTo: 'login', pathMatch: 'full'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      bindToComponentInputs: true
    })
  ],
  providers: [Router],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
