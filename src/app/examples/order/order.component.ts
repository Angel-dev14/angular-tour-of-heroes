import {Component, OnInit} from '@angular/core';
import {
  concatMap,
  delay,
  exhaustMap,
  fromEvent,
  interval,
  map,
  mergeMap,
  Observable,
  of,
  Subject,
  switchMap, take,
  tap
} from 'rxjs';
import {notEven} from '../reactive/my-first-custom-operator';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  _addItem$ = new Subject<string>();
  createOrder$ = new Observable<string>();
  order$: Observable<number>

  items = [
    "Item 1",
    "Item 2",
    "Item 3"
  ];

  orders: string[] = []

  itemClick(item: string) {
    // logic
    console.log('item clicked', item);
    this._addItem$.next(item)
  }

  paymentDone: string | undefined;

  ngOnInit(): void {
    // server
    // this.order$ = this.createOrder$.pipe(
    //   tap((order) => this.orders.push(order)),
    //   map(() => 200)
    // );
    //
    // const observable = new Observable<any>((observable: Observable<any>) => new Observable((subscriber) => {
    //   return observable.subscribe()...
    // }));

    // observable.subscribe({
    //   next: console.log
    // })

    this._addItem$.pipe(
      tap((test) => console.log('on add')),
      switchMap((item) => this.createOrder(item).pipe(
        switchMap(item => this.createPayment(100).pipe(
          tap((response) => this.paymentDone = response)
        ))
      )),
      tap((test) => console.log('on add')),
      tap((response) => console.log('ORDER CREATED WITH STATUS CODE ', response))
    ).subscribe();

    const clicks = fromEvent(document, 'click');
    const result = clicks.pipe(
      switchMap(() => interval(1000).pipe(
        take(10),
        notEven()
      ))
    );
    result.subscribe(x => console.log(x));
  }

  createOrder(item: string) {
    return of(item).pipe(
      tap(() => 'called'),
      delay(1000),
      tap((item) => this.orders.push(item)),
      map(() => 200)
    );
  }

  createPayment(price: number) {
    return of(price).pipe(
      delay(500),
      map(() => "payment is successful")
    )
  }

}
