import {Component, OnInit} from '@angular/core';
import {combineLatest, map, mergeMap, Observable, Subject, switchMap, take, tap, zip} from 'rxjs';

type Durum = ['flat bread', 'meat', 'sauce', 'tomato', 'cabbage'];

interface Order {
  amount: number;
  customerId: number;
}

interface Product {
  product: Durum;
  customerId: number;
}

let customerId = 0;

@Component({
  selector: 'app-rxjs-operators',
  template: `
    <p>ingredients: </p>
    <button (click)="_flatBread$.next('flat bread')">flat bread</button>
    <button (click)="_meat$.next('meat')">meat</button>
    <button (click)="_sauce$.next('sauce')">sauce</button>
    <button (click)="_tomato$.next('tomato')">tomato</button>
    <button (click)="_cabbage$.next('cabbage')">cabbage</button>
    <hr>
    <button (click)="dispatchOrder()">Order</button>
    <ng-container *ngIf="(delivery$ | async) as delivery">
      <h3>Enjoy!</h3>
      <p>{{delivery | json}}</p>
      <img
        width="50"
        height="50"
        src="https://static.vecteezy.com/system/resources/previews/021/523/821/original/illustration-graphic-of-kebab-durum-falafel-turkish-food-food-wrap-icon-free-vector.jpg"
        alt="durum">
    </ng-container>

  `,
})
export class RxjsOperatorsComponent implements OnInit {

  _flatBread$ = new Subject<'flat bread'>();
  _meat$ = new Subject<'meat'>();
  _sauce$ = new Subject<'sauce'>();
  _tomato$ = new Subject<'tomato'>();
  _cabbage$ = new Subject<'cabbage'>();

  durum$: Observable<string[]>;

  _flatBreadCounter = 1;
  _meatCounter = 1;
  _sauceCounter = 1;
  _tomatoCounter = 1;
  _cabbageCounter = 1;

  _order$ = new Subject<Order>();
  delivery$: Observable<Product> | undefined;

  ngOnInit(): void {
    this.durum$ =
      zip([
        this._flatBread$.pipe(map((ing) => `${ing} is ready! - ${this._flatBreadCounter++}`), tap((ing) => console.log(ing))),
        this._meat$.pipe(map((ing) => `${ing} is ready! - ${this._meatCounter++}`), tap((ing) => console.log(ing))),
        this._sauce$.pipe(map((ing) => `${ing} is ready! - ${this._sauceCounter++}`), tap((ing) => console.log(ing))),
        this._tomato$.pipe(map((ing) => `${ing} is ready! - ${this._tomatoCounter++}`), tap((ing) => console.log(ing))),
        this._cabbage$.pipe(map((ing) => `${ing} is ready! - ${this._cabbageCounter++}`), tap((ing) => console.log(ing)))
      ]).pipe(
        tap(durum => console.log('Durum Done! ', durum))
      );
    this.delivery$ = this._order$.pipe(
      tap((order) => console.log('Order comes: ', order)),
      switchMap(order => this.durum$.pipe(
        take(order.amount),
        map((durum) => ({product: durum as Durum, customerId: order.customerId}))
      )),
      tap((product) => console.log('Product is ready! ', product))
    )
  }

  dispatchOrder() {
    const amount = Math.floor(Math.random() * 3) + 1;
    customerId++;
    const order = {amount: amount, customerId: customerId};
    this._order$.next(order);
  }


}
