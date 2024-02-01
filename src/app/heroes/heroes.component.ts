import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Hero} from '../examples/hero';
import {HeroesService} from '../services/heroes.service';
import { CanDeactivateMyComponent } from '../guards/can-deactivate-my-component';

@Component({
  selector: 'heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements CanDeactivateMyComponent {

  heroes: Hero[];
  selectedHero?: Hero;

  constructor(
    private _heroesService: HeroesService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    this.heroes = _heroesService.findAllHeroes();
  }

  selectHero(hero: Hero) {
    console.log('hero select', hero);
    this.selectedHero = hero;
    this._router.navigate([hero.id], {
      relativeTo: this._route
    });
  }

  canDeactivateLogic(): boolean {
    // if(hasUnsavedChanges)
    return true;
  }
}
