import {authReducer, AuthState} from "./authentication/store/auth.reducer";
import {ActionReducerMap} from "@ngrx/store";
import {accountReducer, AccountState} from "./account/store/account.reducer";
import {charityReducer, CharityState} from "./charities/store/charity.reducer";
import {fundReducer, FundState} from "./funds/store/fund.reducer";


export interface AppState {
  account: AccountState,
  auth: AuthState,
  charity: CharityState,
  fund: FundState
}

export const appReducer : ActionReducerMap<AppState> = {
  auth: authReducer,
  account: accountReducer,
  charity: charityReducer,
  fund: fundReducer
}
