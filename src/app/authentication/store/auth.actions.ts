import {Action} from "@ngrx/store";
import {UserRegister} from "../models/user-register.model";
import {AuthenticatedUser} from "../models/authenticated-user.model";

export const LOGIN = '[Auth] Login';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const REDIRECT_LOGIN = '[Auth] Redirect to Login';

export const REGISTER = '[Auth] Register';
export const CONFIRM_REGISTER = '[Auth] Confirm Register';

export const LOGOUT = '[Auth] Logout';

export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_ERROR = '[Auth] Login Error';

export class LoginAction implements Action {
  readonly type = LOGIN;

  constructor(public credentials: { email: string, password: string }) {
  }
}

export class RegisterAction implements Action {
  readonly type = REGISTER;

  constructor(public registerUser: UserRegister) {
  }
}

export class AutoLoginAction implements Action {
  readonly type = AUTO_LOGIN;
}

export class RedirectLoginAction implements Action {
  readonly type = REDIRECT_LOGIN;

  constructor(public redirectTo: string) {
  }
}

export class ConfirmRegisterAction implements Action {
  readonly type = CONFIRM_REGISTER;

  constructor(public confirmInfo: { email: string, secretCode: string}) {
  }
}

export class LogoutAction implements Action {
  readonly type = LOGOUT;
}

export class LoginSuccessAction implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(public authenticatedUser: AuthenticatedUser,
              public redirect: boolean) {
  }
}

export class LoginErrorAction implements Action {
  readonly type = LOGIN_ERROR;

  constructor(public errorMessage: string) {
  }
}
