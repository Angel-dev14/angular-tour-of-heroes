import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, filter, map, Observable, of, ReplaySubject, Subject, tap} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-rxjs-example',
  templateUrl: './rxjs-example.component.html',
  styleUrls: ['./rxjs-example.component.css']
})
export class RxjsExampleComponent implements OnInit {

  _notifier$ = new ReplaySubject<number>(10);
  _loader$ = new BehaviorSubject(true);
  notifier$ = new Observable();


  ngOnInit(): void {
    this.notifier$ = this._notifier$.asObservable();

    // in some function
    this.notifier$.subscribe();

    const ref = this._notifier$.pipe().subscribe()

    const stream$ = of(['water', 'clean water', 'water', 'clean water']);
    stream$.pipe(
      tap(value => console.log('what comes: ', value)),
      map(value => value.filter(v => v === 'clean water')),
      map(value => value.map(v => this.warmWater(v)))
    ).subscribe({
      next: (value) => console.log(value)
    });

    this._notifier$.pipe(
      map((value) => value.toString())
    ).subscribe({
      next: value => console.log(value.concat("asodkosakd"), 'value')
    });
    this.click();

    setTimeout(() => {
      this._notifier$.subscribe({
        next: value =>  {
          console.log("LATE SUB ", value );
          this._loader$.next(false);
        }
      })
    }, 5000);
  }

  click() {
    setInterval(
      () => {
        const value = Math.floor(Math.random() * 5) + 1
        this._notifier$.next(value);
      }, 1500
    )
  }

  warmWater(water: string) {
    return "warm water";
  }

}
