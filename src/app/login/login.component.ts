import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AbstractControl, FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { map, withLatestFrom } from 'rxjs';
export const myCustomValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  debugger;
  if (control.value === "angel") {
    return {
      'error': "You should not have angel as an username"
    }
  }
  return null;

}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
  }

}
