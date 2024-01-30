import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {HEROES} from './mock-heroes';
import {iterator} from 'rxjs/internal/symbol/iterator';
import {HeroesService} from './services/heroes/heroes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit, AfterViewInit {

  screen: number | undefined;

  @ViewChild("screen1", {read: ElementRef, static: true}) screenRef: ElementRef

  constructor(
    private _service$: HeroesService,
  ) {

  }


  ngOnInit(): void {
    console.log('APP INIT')
  }

  ngAfterViewInit(): void {
    setInterval(() => {
      this._service$._state$.next("state");
    }, 1000);
  }
}
