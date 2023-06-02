import {Action} from "@ngrx/store";
import {UserAccount} from "../user-account.model";
import {Payment} from "../../shared/models/payment.model";

export const FETCH_DATA = '[Account] Fetch Data';
export const FETCH_DATA_SUCCESS = '[Account] Fetch Data Success';
export const FETCH_DATA_ERROR = '[Account] Fetch Data Error';

export const CHANGE_PASSWORD = '[Account] Change Password';
export const CHANGE_PASSWORD_SUCCESS = '[Account] Change Password Success';
export const CHANGE_PASSWORD_ERROR = '[Account] Change Password Error';

export const FETCH_USER_PAYMENTS = '[Account] Fetch User Payments';
export const FETCH_USER_PAYMENTS_SUCCESS = '[Account] Fetch User Payments Success';
export const FETCH_USER_PAYMENTS_ERROR = '[Account] Fetch User Payments Error';

export const CHECK_VOTE_AVAILABLE = '[Account] Check Vote Available';
export const CHECK_VOTE_AVAILABLE_RESULT = '[Account] Check Vote Available Result';
export const VOTED = '[Account] Voted';

export const CLEAR_DATA = '[Account] Clear Data';

export class FetchDataAction implements Action {
  readonly type = FETCH_DATA;

  constructor(public initializePhoto: boolean = true) {
  }
}

export class FetchDataSuccessAction implements Action {
  readonly type = FETCH_DATA_SUCCESS;

  constructor(public account: UserAccount) {
  }
}

export class FetchDataErrorAction implements Action {
  readonly type = FETCH_DATA_ERROR;

  constructor(public errorMessage: string) {
  }
}

export class ChangePasswordAction implements Action {
  readonly type = CHANGE_PASSWORD;

  constructor(public oldPassword: string,
              public newPassword: string) {
  }
}

export class ChangePasswordSuccessAction implements Action {
  readonly type = CHANGE_PASSWORD_SUCCESS;
}

export class ChangePasswordErrorAction implements Action {
  readonly type = CHANGE_PASSWORD_ERROR;
}

export class FetchUserPaymentsAction implements Action {
  readonly type = FETCH_USER_PAYMENTS;
}

export class FetchUserPaymentsSuccessAction implements Action {
  readonly type = FETCH_USER_PAYMENTS_SUCCESS;

  constructor(public payments: Payment[]) {
  }
}

export class FetchUserPaymentsErrorAction implements Action {
  readonly type = FETCH_USER_PAYMENTS_ERROR;

  constructor(public errorMessage: string) {
  }
}

export class CheckVoteAvailableAction implements Action {
  readonly type = CHECK_VOTE_AVAILABLE;
}

export class CheckVoteAvailableResultAction implements Action {
  readonly type = CHECK_VOTE_AVAILABLE_RESULT;

  constructor(public canVote: boolean = false) {
  }
}

export class VotedAction implements Action {
  readonly type = VOTED;
}

export class ClearDataAction implements Action {
  readonly type = CLEAR_DATA;
}
