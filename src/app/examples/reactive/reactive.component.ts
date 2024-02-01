import {Component, OnInit} from '@angular/core';
import {
  combineAll, concat,
  concatAll,
  concatMap,
  filter,
  map, merge,
  mergeMap,
  Observable,
  of,
  Subject,
  switchMap,
  take,
  tap, toArray,
  zip
} from 'rxjs';
import {notNull} from './not-null';

type Durum = ['flat bread', 'meat', 'sauce', 'tomato', 'cabbage'];

// example 1

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
  selector: 'app-reactive',
  template: `
    <button (click)="dispatchOrder()">Order Durum</button>
    <hr/>
    <button (click)="_flatBread.next('flat bread')">Add flat bread</button>
    <button (click)="_meat.next('meat')">Add meat</button>
    <button (click)="_sauce.next('sauce')">Add sauce</button>
    <button (click)="_tomato.next('tomato')">Add tomato</button>
    <button (click)="_cabbage.next('cabbage')">Add cabbage</button>
    <ng-container *ngIf="delivery$ | async as product">
      <section *ngIf="product?.product">
        <h4>Enjoy</h4>
        <img
          width="50"
          height="50"
          src="https://static.vecteezy.com/system/resources/previews/021/523/821/original/illustration-graphic-of-kebab-durum-falafel-turkish-food-food-wrap-icon-free-vector.jpg"
          alt="durum">
        <h5>Ingredients:</h5>
        <pre>{{product | json}}</pre>
      </section>
    </ng-container>
  `,
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  _order = new Subject<Order>();

  _flatBread = new Subject<'flat bread'>();
  _meat = new Subject<'meat'>();
  _sauce = new Subject<'sauce'>();
  _tomato = new Subject<'tomato'>();
  _cabbage = new Subject<'cabbage'>();

  flatBreadCounter = 1;
  meatCounter = 1;
  sauceCounter = 1;
  tomatoCounter = 1;
  cabbageCounter = 1;

  durum$: Observable<Durum>;
  delivery$: Observable<Product>;

  ngOnInit(): void {

    const observable = new Observable((subscriber) => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
      }, 1000);
    });

    observable.subscribe({next: (val) => console.log(val)});

    // create the durum here
    this.durum$ = zip(
      this._flatBread.pipe(map((ing) => `${ing} - ${this.flatBreadCounter++}`), tap(console.log)),
      this._meat.pipe(map((ing) => `${ing} - ${this.meatCounter++}`), tap(console.log)),
      this._sauce.pipe(map((ing) => `${ing} - ${this.sauceCounter++}`), tap(console.log)),
      this._tomato.pipe(map((ing) => `${ing} - ${this.tomatoCounter++}`), tap(console.log)),
      this._cabbage.pipe(map((ing) => `${ing} - ${this.cabbageCounter++}`), tap(console.log))
    ).pipe(
      tap((durum) => console.log('Enjoy ', durum))
    );

    this.delivery$ = this._order.pipe(
      tap((order) => console.log("New order ", order)),
      concatMap(({amount, customerId}) =>
        this.durum$.pipe(
          take(amount),
          map((durum) => ({product: durum, customerId: customerId}))
        )),
      tap((durum) => console.log("Product ", durum))
    );
  }

  dispatchOrder() {
    const amount = Math.floor(Math.random() * 3) + 1;
    ++customerId;
    this._order.next({amount, customerId});
  }
}
