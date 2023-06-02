import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppState} from "../../app.reducer";
import {Store} from "@ngrx/store";

import * as fromAuthActinos from "../store/auth.actions";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css', '../auth-pages.styles.css']
})
export class LoginPageComponent implements OnInit{

  error: string;

  loginForm: FormGroup = new FormGroup<any>({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.select('auth')
      .subscribe(state => {
        this.error = state.errorMessage;
      })
  }

  checkEmailInvalid() {
    return this.loginForm.get('email').touched && this.loginForm.get('email').invalid;
  }

  checkPasswordInvalid() {
    return this.loginForm.get('password').touched && this.loginForm.get('password').invalid;
  }

  onLogin() {
    if (this.loginForm.valid) {
      const credentials: {email: string, password: string} = this.loginForm.value;

      this.store.dispatch(new fromAuthActinos.LoginAction(credentials));
    }
  }

}
