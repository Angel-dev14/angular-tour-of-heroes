import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl, NG_VALIDATORS,
  NG_VALUE_ACCESSOR, ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import { Task } from '../todolist/todolist.component';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: [ './task.component.css' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TaskComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: TaskComponent
    }
  ]
})
export class TaskComponent implements ControlValueAccessor, OnInit, Validator {
  ngOnInit(): void {
  }

  task: Task;
  taskGroup = this._initTaskGroup;
  touched: boolean = false;

  onChange = (task) => {};
  onTouched = () => {};

  constructor(
    private _formBuilder: FormBuilder
  ) {
  }


  registerOnChange(fn: any): void {
    console.log(fn, 'fn')
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    this.taskGroup.patchValue(obj);
  }

  notify() {
    console.log(this.taskGroup);
    // this.onChange(this.taskGroup.getRawValue() as Task);
  }

  markAsTouched() {
    if(!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(isDisabled: boolean) {
    console.log(isDisabled);
    this.taskGroup.disable();
  }

  private get _initTaskGroup() {
    return this._formBuilder.group(
      {
        id: new FormControl(null),
        name: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required)
      }
    )
  }

  edit() {
    this.taskGroup.enable();
    this.markAsTouched();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    console.log(control, 'validate');
    return {
      error: 'error'
    };
  }

  get getError() {
    if(!this.taskGroup?.valid) {
      return "your form control is not valid"
    }
    return "";
  }

}
