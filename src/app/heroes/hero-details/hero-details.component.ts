import {
  AfterContentInit, AfterViewChecked, AfterViewInit,
  Component,
  ContentChild, DoCheck,
  ElementRef,
  Input, OnDestroy, OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../examples/hero';

@Component({
  selector: 'hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css']
})
export class HeroDetailsComponent implements OnInit, DoCheck, AfterContentInit, AfterViewInit, AfterViewChecked, OnDestroy {

  @Input() hero?: Hero;
  @Input() id!: number;
  @ContentChild('title') customContent?: ElementRef;

  constructor(
    private _route: ActivatedRoute,
    private _heroesService: HeroesService,
  ) {
    // DO NOT WRITE CODE HERE!
  }

  ngOnInit(): void {
    console.log('[INIT]')
    this._route.paramMap
      .pipe(
        map((paramMap) => Number(paramMap.get('id'))),
        mergeMap((id) => this._heroesService.findById(id)),
      ).subscribe({
      next: (hero) => this.hero = hero
    });
  }

  ngDoCheck(): void {
    console.log('[DO CHECK]')
  }

  ngAfterContentInit() {
    console.log('[AFTER CONTENT INIT]');
  }

  ngAfterViewInit() {
    console.log('[AFTER VIEW INIT]');
  }

  ngAfterViewChecked() {
    console.log('[AFTER VIEW CHECKED]');
  }

  ngOnDestroy() {
    console.log('[ON DESTROY]');
  }

}
