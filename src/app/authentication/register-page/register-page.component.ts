import {Component, OnInit} from '@angular/core';
import {AppState} from "../../app.reducer";
import {Store} from "@ngrx/store";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserRegister} from "../models/user-register.model";

import * as fromAuthActions from "../store/auth.actions";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css', '../auth-pages.styles.css']
})
export class RegisterPageComponent implements OnInit {

  secretCodeModal: boolean = false;
  error: string;

  registerForm: FormGroup = new FormGroup<any>({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    passwordCheck: new FormControl('', [Validators.required, Validators.minLength(8)]),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required)
  });

  confirmRegisterForm: FormGroup = new FormGroup<any>({
    email: new FormControl('', Validators.required),
    secretCode: new FormControl('', Validators.required)
  });

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.select('auth')
      .subscribe(state => {
        this.error = state.errorMessage;
      })
  }

  passwordsMatch() {
    const password: string = this.registerForm.get('password').value,
      passwordCheck: string = this.registerForm.get('passwordCheck').value;

    return !(this.registerForm.get('password').touched
      && this.registerForm.get('passwordCheck').touched
      && password !== passwordCheck);
  }

  passwordInvalid() {
    return (this.registerForm.get('password').touched && this.registerForm.get('password').invalid);
  }

  passwordCheckInvalid() {
    return (this.registerForm.get('passwordCheck').touched && this.registerForm.get('passwordCheck').invalid);
  }

  onRegister() {
    this.error = null;
    if (this.registerForm.valid && this.passwordsMatch()) {
      const userToRegister: UserRegister = this.registerForm.value;

      this.store.dispatch(new fromAuthActions.RegisterAction(userToRegister));

      this.confirmRegisterForm.get('email').setValue((userToRegister.email));
      this.confirmRegisterForm.get('email').disable();
      this.secretCodeModal = true;
    } else {
      this.error = 'Неправильно введені дані.';
    }
  }

  onConfirmRegister() {
    if (this.confirmRegisterForm.valid) {

      let confirmInfo: { email: string, secretCode: string} = {
        email: this.confirmRegisterForm.get('email').value,
        secretCode: this.confirmRegisterForm.get('secretCode').value
      };

      this.store.dispatch(new fromAuthActions.ConfirmRegisterAction(confirmInfo));
    }
  }

}
