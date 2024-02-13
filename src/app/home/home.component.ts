import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../services/heroes.service';
import { ThemePalette } from '@angular/material/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private _form: FormBuilder,
  ) {
  }


  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Primary', completed: false, color: 'primary'},
      {name: 'Accent', completed: false, color: 'accent'},
      {name: 'Warn', completed: false, color: 'warn'},
    ],
  };

  form = this._form.group({
    task: new FormControl(false),
    subtasks: this._form.group({

    })
  })

  taskMissing = false;

  ngOnInit() {
    this.task.subtasks.forEach(task => {
      const array = this.form.get('subtasks') as FormGroup;
      array.addControl(task.name, new FormControl(task.completed));
      // array.push(new FormControl(task.completed));
    });

    this.form.get('task').valueChanges.subscribe({
      next: value => {
        console.log(value)
      }
    });

    this.form.valueChanges.subscribe({
      next: val => console.log(val)
    })

    this.form.get('subtasks').valueChanges.subscribe({
      next: value => {
        console.log(value);
      }
    })
  }

  get subtaskGroup() {
    return this.form.get('subtasks') as FormGroup;
  }

  // resolveControl(index: number) {
  //   return (this.form.get('subtasks') as FormGroup).at(index) as FormControl;
  // }

  test(event: MatCheckboxChange) {
    console.log(event)
  }

  onCheck(event: MatCheckboxChange) {
    console.log(event);
    this.task.subtasks.forEach(t => t.completed = event.checked)
  }

  get parentTask() {
    return this.form.get('task') as FormControl;
  }

  onSubtaskChange(event: MatCheckboxChange) {
    const someMissing =
      this.task.subtasks.filter(it => !it.completed).length > 0;
    console.log(this.task.subtasks);
    console.log(someMissing);
    if(someMissing) {
      this.task.completed = false;
      this.taskMissing = true;
    }
    else {
      this.taskMissing = false;
      this.task.completed = true;
    }
  }

}
