import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export interface Task {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: [ './todolist.component.css' ]
})
export class TodolistComponent implements OnInit {

  myTask = this._initMyTasks;
  addedTasks = this._initAddedTasks;


  constructor(
    private _formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
  }

  private get _initMyTasks() {
    return this._formBuilder.group(
      {
        id: new FormControl(null),
        name: new FormControl(null),
        description: new FormControl(null)
      }
    )
  }

  private get _initAddedTasks() {
    return this._formBuilder.array(
      []
    )
  }

  addTask() {
    const task = (this.myTask.getRawValue()) as Task;
    const control = new FormControl(task, Validators.required);
    control.disable();
    this.addedTasks.push(control);
  }

  get myAddedTasks() {
    return this.addedTasks.controls;
  }

  addedTasksStateCheck() {
    console.log('added tasks state change');
    console.log(this.addedTasks.getRawValue());
  }


}
