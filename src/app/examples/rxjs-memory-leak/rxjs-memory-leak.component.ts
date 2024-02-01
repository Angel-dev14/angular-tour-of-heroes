import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subject, Subscription, takeUntil, takeWhile } from 'rxjs';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-rxjs-memory-leak',
  templateUrl: './rxjs-memory-leak.component.html',
  styleUrls: ['./rxjs-memory-leak.component.css']
})
export class RxjsMemoryLeakComponent implements OnInit, OnDestroy {

  subRef: Subscription;
  _destroySubject$ = new Subject<void>();

  constructor(
    private _service$: HeroesService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {

  }

  // syntax one
  @HostListener(':click', ['$event']) onClick(event: any) {
    console.log(event);
  }

  ngOnInit(): void {
    // syntax 2
    fromEvent(document, 'click').subscribe({
      next: click => console.log(click, 'click')
    })
    this.subRef = this._service$._state$
      .pipe(
      )
      .subscribe({
        next: (val) => {
          console.warn(Math.random(), 'VALUE', val)
        }
      })
  }

  prevPage() {
    this._router.navigate(['../'], {
      relativeTo: this._route,
    })
  }

  ngOnDestroy(): void {
    this._destroySubject$.next();
    this._destroySubject$.complete();
    console.log('ON DESTROY [RXJS MEMORY LEAK]')
  }


}
