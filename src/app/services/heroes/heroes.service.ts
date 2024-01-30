import {Injectable} from '@angular/core';
import {Hero} from '../../hero';
import {HEROES} from '../../mock-heroes';
import {fromEvent, Observable, of, Subject} from 'rxjs';

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
