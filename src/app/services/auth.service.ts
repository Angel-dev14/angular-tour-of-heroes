import { Injectable } from '@angular/core';
import { delay, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged = false;

  constructor() { }

  login() {
    this.isLogged = true;
    return of(true).pipe(
      delay(500),
    )
  }
}
