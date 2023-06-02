import {AuthenticatedUser} from "../models/authenticated-user.model";
import {Action} from "@ngrx/store";

import * as fromAuthActions from "./auth.actions";

export interface AuthState {
  authenticatedUser: AuthenticatedUser,
  errorMessage: string,
  redirectTo: string
}

const initialState: AuthState = {
  authenticatedUser: null,
  errorMessage: null,
  redirectTo: null
}

export function authReducer(state: AuthState = initialState,
                            action: Action): AuthState {

  switch (action.type) {

    case fromAuthActions.REDIRECT_LOGIN: {
      return {
        ...state,
        redirectTo: (action as fromAuthActions.RedirectLoginAction).redirectTo
      };
    }

    case fromAuthActions.CONFIRM_REGISTER: {
      return {
        ...state,
        redirectTo: 'charity'
      };
    }

    case fromAuthActions.LOGIN_SUCCESS: {
      return {
        ...state,
        authenticatedUser: (action as fromAuthActions.LoginSuccessAction).authenticatedUser,
        errorMessage: null
      };
    }

    case fromAuthActions.LOGIN_ERROR: {
      return {
        ...state,
        errorMessage: (action as fromAuthActions.LoginErrorAction).errorMessage
      };
    }

    default:
      return state;
  }

}
