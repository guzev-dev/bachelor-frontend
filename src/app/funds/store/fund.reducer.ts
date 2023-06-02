import {Fund} from "../fund.model";
import {Action} from "@ngrx/store";

import * as fromFundActions from "./fund.actions";
import {Charity} from "../../charities/charity.model";

export interface FundState {
  funds: {
    value: Fund[],
    firstPage: boolean,
    lastPage: boolean,
    currentPage: number,
    errorMessage: string
  },
  fund: {
    value: Fund,
    errorMessage: string,
    charity: Charity[]
  },
  sortOrders: string[],
  locations: string[]
}

const initialState: FundState = {
  funds: {
    value: null,
    firstPage: null,
    lastPage: null,
    currentPage: null,
    errorMessage: null
  },
  fund: {
    value: null,
    errorMessage: null,
    charity: null
  },
  sortOrders: null,
  locations: null
}

export function fundReducer(state: FundState = initialState,
                            action: Action): FundState {

  switch (action.type) {

    case fromFundActions.FETCH_FUNDS_SUCCESS: {
      const successAction = action as fromFundActions.FetchFundsSuccessAction;
      return {
        ...state,
        funds: {
          ...state.funds,
          value: successAction.funds,
          firstPage: successAction.firstPage,
          lastPage: successAction.lastPage,
          currentPage: successAction.page,
          errorMessage: null
        }
      };
    }

    case fromFundActions.FETCH_FUNDS_ERROR: {
      return {
        ...state,
        funds: {
          ...state.funds,
          errorMessage: (action as fromFundActions.FetchFundsErrorAction).errorMessage
        }
      };
    }

    case fromFundActions.FETCH_SINGLE_FUND_SUCCESS: {
      return {
        ...state,
        fund: {
          ...state.fund,
          value: (action as fromFundActions.FetchSingleFundSuccessAction).fund,
          errorMessage: null
        }
      };
    }

    case fromFundActions.FETCH_SINGLE_FUND_ERROR: {
      return {
        ...state,
        fund: {
          ...state.fund,
          errorMessage: (action as fromFundActions.FetchSingleFundErrorAction).errorMessage
        }
      };
    }

    case fromFundActions.FETCH_SORT_ORDERS_SUCCESS: {
      return {
        ...state,
        sortOrders: (action as fromFundActions.FetchSortOrdersSuccessAction).sortOrders
      };
    }

    case fromFundActions.FETCH_LOCATIONS_SUCCESS: {
      return {
        ...state,
        locations: (action as fromFundActions.FetchLocationsSuccessAction).locations
      };
    }

    case fromFundActions.FETCH_FUND_CHARITY_SUCCESS: {
      return {
        ...state,
        fund: {
          ...state.fund,
          charity: (action as fromFundActions.FetchFundCharitySuccessAction).charity
        }
      };
    }

    default:
      return state;
  }
}
