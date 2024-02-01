import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Hero } from '../examples/hero';
import { HEROES } from '../examples/mock-heroes';

@Injectable({providedIn: 'root'})
export class HeroesService {

  public _state$ = new Subject<string>();

  constructor() {
    console.log('Init [HeroesService]')
  }

  findAllHeroes(): Hero[] {
    // backend
    return HEROES;
  }

  findById(id: number): Observable<Hero | undefined> {
    return of<Hero | undefined>(HEROES.find(hero => hero.id === id));
  }
}
