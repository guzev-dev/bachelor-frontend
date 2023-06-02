import {Category} from "../../shared/models/category.model";
import {Action} from "@ngrx/store";

import * as fromCharityActions from "./charity.actions";
import {Charity} from "../charity.model";
import {Payment} from "../../shared/models/payment.model";
import {FetchCharitiesSuccessAction} from "./charity.actions";

export interface CharityState {
  charities: {
    value: Charity[],
    firstPage: boolean,
    lastPage: boolean,
    currentPage: number,
    errorMessage: string
  },
  charity: {
    value: Charity,
    errorMessage: string,
    payments: Payment[]
  },
  categories: Category[],
  statuses: string[],
  sortOrders: string[]
}

const initialState: CharityState = {
  charities: {
    value: null,
    firstPage: null,
    lastPage: null,
    currentPage: null,
    errorMessage: null
  },
  charity: {
    value: null,
    errorMessage: null,
    payments: null
  },
  categories: null,
  statuses: null,
  sortOrders: null
}

export function charityReducer(state: CharityState = initialState,
                               action: Action) : CharityState {

  switch (action.type) {

    case fromCharityActions.FETCH_CATEGORIES_SUCCESS: {
      return {
        ...state,
        categories: (action as fromCharityActions.FetchCategoriesSuccessAction).categories
      };
    }

    case fromCharityActions.FETCH_STATUSES_SUCCESS: {
      return {
        ...state,
        statuses: (action as fromCharityActions.FetchStatusesSuccessAction).statuses
      };
    }

    case fromCharityActions.FETCH_SORT_ORDERS_SUCCESS: {
      return {
        ...state,
        sortOrders: (action as fromCharityActions.FetchSortOrdersSuccessAction).sortOrders
      };
    }

    case fromCharityActions.FETCH_CHARITIES_SUCCESS: {
      const successAction: FetchCharitiesSuccessAction = action as fromCharityActions.FetchCharitiesSuccessAction;
      return {
        ...state,
        charities: {
          value: successAction.charities,
          firstPage: successAction.firstPage,
          lastPage: successAction.lastPage,
          currentPage: successAction.page,
          errorMessage: null
        }
      };
    }

    case fromCharityActions.FETCH_CHARITIES_ERROR: {
      return {
        ...state,
        charities: {
          value: null,
          firstPage: null,
          lastPage: null,
          currentPage: null,
          errorMessage: (action as fromCharityActions.FetchCharitiesErrorAction).errorMessage
        }
      };
    }

    case fromCharityActions.FETCH_CHARITY_PAYMENTS_SUCCESS: {
      return {
        ...state,
        charity: {
          ...state.charity,
          payments: (action as fromCharityActions.FetchCharityPaymentsSuccessAction).payments
        }
      };
    }

    case fromCharityActions.FETCH_SINGLE_CHARITY_SUCCESS: {
      return {
        ...state,
        charity: {
          ...state.charity,
          value: (action as fromCharityActions.FetchSingleCharitySuccessAction).charity,
        }
      };
    }

    case fromCharityActions.FETCH_SINGLE_CHARITY_ERROR: {
      return {
        ...state,
        charity: {
          value: null,
          payments: null,
          errorMessage: (action as fromCharityActions.FetchSingleCharityErrorAction).errorMessage
        }
      };
    }

    default:
      return state;
  }

}

