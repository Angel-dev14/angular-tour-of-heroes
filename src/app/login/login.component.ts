import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  password = "";
  username = "";

  usernameControl = new FormControl();
  passwordControl = new FormControl();

  ngOnInit(): void {
  }

  onSubmit() {
    const username = this.usernameControl.value;
    const password = this.passwordControl.value;
    console.log(username);
    console.log(password);
  }

}
