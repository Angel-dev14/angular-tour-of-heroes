import {Component, inject} from '@angular/core';
import {HeroesService} from '../services/heroes/heroes.service';


abstract  class BaseClass {

  constructor(
    private service: HeroesService,

  ) {

  }



}

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseClass {

  // heroesService = inject(HeroesService);

}
