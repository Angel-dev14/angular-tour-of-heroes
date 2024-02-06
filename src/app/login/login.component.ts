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
import { concat, debounceTime, map, mergeMap, takeUntil, withLatestFrom } from 'rxjs';
import { combineLatest } from 'rxjs/internal/operators/combineLatest';

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

  password = "";
  username = "";

  registrationForm: FormGroup = new FormGroup<any>(
    {
      username: new FormControl("username", Validators.required),
      password: new FormControl("password", Validators.required)
    }
  );


  toDoListForm: FormGroup = new FormGroup<any>(
    {
      tasks: new FormArray([
          new FormControl("task1"),
          new FormControl("task2"),
      ])
    }
  )

  usernameControl = new FormControl<string>(
    null
  );
  passwordControl = new FormControl();

  value: string;

  ngOnInit(): void {
    // this.usernameControl.disable()
    // this.usernameControl.patchValue("new value");
    // this.usernameControl.setValue("asdo")
    // this.usernameControl.disable()
    // const task = new FormControl(null);
    // (this.toDoListForm.controls['tasks'] as FormArray).push(task)
    this.usernameControl.valueChanges.pipe(
      withLatestFrom(
        this.passwordControl.valueChanges
      ),
      map(([ username, passwrd ]) => `${ username }-${ passwrd }`)
    ).subscribe({
      next: value => this.value = value
    });
    // changes
    // this.usernameControl.updateValueAndValidity();

    this.registrationForm.valueChanges.subscribe({
      next: (value) => console.log(value, 'changes')
    });

    this.registrationForm.addControl("test", new FormControl("test")
    );

    console.log(this.toDoListForm);
    console.log((this.toDoListForm.controls['tasks'] as FormArray).controls[0]) ;
  }

  getTask(taskForm) {
    console.log(taskForm, 'task form');
    return taskForm as FormControl;
  }

  get tasks(): FormControl<any>[] {
    return (this.toDoListForm.controls['tasks'] as FormArray).controls as FormControl[];
  }


  onSubmit() {
    const request = this.registrationForm.getRawValue();
    // send the request
    const username = this.usernameControl.value;
    console.log(this.usernameControl);
    const password = this.passwordControl.value;
    console.log(username);
    console.log(password);

  }

  protected readonly FormControl = FormControl;
}
