import {
  AfterContentInit, AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {Hero} from '../../examples/hero';
import {HeroesService} from '../../services/heroes.service';

@Component({
  selector: 'hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HeroComponent {

  @Input() hero?: Hero;
  @Input() selected = false;

  @Output() onHeroSelect = new EventEmitter<Hero>()

  constructor(
    private _heroesService: HeroesService
  ) {

  }


  selectHero() {
    this.onHeroSelect.emit(this.hero);
  }

}
