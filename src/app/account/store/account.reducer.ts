
import * as fromAccountActions from "./account.actions";
import {UserAccount} from "../user-account.model";
import {Action} from "@ngrx/store";
import {Payment} from "../../shared/models/payment.model";

export interface AccountState {
  account: UserAccount,
  accountPayments: Payment[],
  errorMessage: string,
  passwordChanged: boolean,
  canVote: boolean
}

export const initialState: AccountState = {
  account: null,
  accountPayments: null,
  errorMessage: null,
  passwordChanged: null,
  canVote: null
}

export function accountReducer(state: AccountState = initialState,
                               action: Action) : AccountState {

  switch (action.type) {

    case fromAccountActions.FETCH_USER_PAYMENTS:
    case fromAccountActions.FETCH_DATA:
    case fromAccountActions.CHANGE_PASSWORD: {
      return {
        ...state,
        passwordChanged: null,
        errorMessage: null
      };
    }

    case fromAccountActions.FETCH_DATA_SUCCESS: {
      return {
        ...state,
        account: (action as fromAccountActions.FetchDataSuccessAction).account,
        errorMessage: null
      };
    }

    case fromAccountActions.FETCH_USER_PAYMENTS_SUCCESS: {
      return {
        ...state,
        accountPayments: (action as fromAccountActions.FetchUserPaymentsSuccessAction).payments,
        errorMessage: null
      };
    }

    case fromAccountActions.FETCH_USER_PAYMENTS_ERROR:
    case fromAccountActions.FETCH_DATA_ERROR: {
      return {
        ...state,
        errorMessage: (action as fromAccountActions.FetchDataErrorAction).errorMessage
      };
    }

    case fromAccountActions.CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        passwordChanged: true
      };
    }

    case fromAccountActions.CHANGE_PASSWORD_ERROR: {
      return {
        ...state,
        passwordChanged: false
      };
    }

    case fromAccountActions.CHECK_VOTE_AVAILABLE_RESULT: {
      return {
        ...state,
        canVote: (action as fromAccountActions.CheckVoteAvailableResultAction).canVote
      };
    }

    case fromAccountActions.VOTED: {
      return {
        ...state,
        canVote: false
      };
    }

    case fromAccountActions.CLEAR_DATA: {
      return {
        ...state,
        account: null,
        errorMessage: null,
        passwordChanged: null
      };
    }

    default:
      return state;
  }

}
