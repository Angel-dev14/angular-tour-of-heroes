import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroComponent } from './heroes/hero/hero.component';
import { HeroDetailsComponent } from './heroes/hero-details/hero-details.component';
import { HttpClientModule } from '@angular/common/http';
import { AsyncPipe, CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RxjsOperatorsComponent } from './examples/rxjs-operators/rxjs-operators.component';
import { RxjsExampleComponent } from './examples/rxjs-example/rxjs-example.component';
import { RxjsMemoryLeakComponent } from './examples/rxjs-memory-leak/rxjs-memory-leak.component';
import { OrderComponent } from './examples/order/order.component';
import { ElementRefComponent } from './examples/element-ref/element-ref.component';
import { HomeComponent } from './home/home.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { DirectivesComponent } from './directives/directives.component';
import { HighlightDirective } from './directives/unstructural-directives/highlight.directive';
import { UnlessDirective } from './directives/structural-directives/unless.directive';
import { TodolistComponent } from './todolist/todolist.component';
import { TaskComponent } from './task/task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material.module';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroComponent,
    HeroDetailsComponent,
    HomeComponent,
    // ReactiveComponent,
    RxjsExampleComponent,
    RxjsOperatorsComponent,
    OrderComponent,
    RxjsMemoryLeakComponent,
    ElementRefComponent,
    LoginComponent,
    AccessDeniedComponent,
    DirectivesComponent,
    HighlightDirective,
    UnlessDirective,
    TodolistComponent,
    TaskComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AsyncPipe,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppMaterialModule,
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
