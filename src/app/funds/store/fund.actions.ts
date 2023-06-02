import {Action} from "@ngrx/store";
import {Fund} from "../fund.model";
import {Charity} from "../../charities/charity.model";

export const FETCH_FUNDS = '[Funds] Fetch Funds';
export const FETCH_FUNDS_SUCCESS = '[Funds] Fetch Funds Success';
export const FETCH_FUNDS_ERROR = '[Funds] Fetch Funds Error';

export const FETCH_SINGLE_FUND = '[Funds] Fetch Single Fund';
export const FETCH_SINGLE_FUND_SUCCESS = '[Funds] Fetch Single Fund Success';
export const FETCH_SINGLE_FUND_ERROR = '[Funds] Fetch Single Fund Error';

export const FETCH_SORT_ORDERS = '[Funds] Fetch Sort Orders';
export const FETCH_SORT_ORDERS_SUCCESS = '[Funds] Fetch Sorted Orders Success';

export const FETCH_LOCATIONS  = '[Funds] Fetch Locations';
export const FETCH_LOCATIONS_SUCCESS = '[Funds] Fetch Locations Success';

export const FETCH_FUND_CHARITY = '[Funds] Fetch Fund Charity';
export const FETCH_FUND_CHARITY_SUCCESS = '[Funds] Fetch Fund Charity Success';

export const DOWNLOAD_DOC = '[Funds] Download Document';

export class FetchFundsAction implements Action {
  readonly type = FETCH_FUNDS;

  constructor(public name: string,
              public location: string,
              public initializeLogos: boolean,
              public page: number,
              public size: number,
              public sortBy: string) {
  }
}

export class FetchFundsSuccessAction implements Action {
  readonly type = FETCH_FUNDS_SUCCESS;

  constructor(public funds: Fund[],
              public firstPage: boolean,
              public lastPage: boolean,
              public page: number) {
  }
}

export class FetchFundsErrorAction implements Action {
  readonly type = FETCH_FUNDS_ERROR;

  constructor(public errorMessage: string) {
  }
}

export class FetchSingleFundAction implements Action {
  readonly type = FETCH_SINGLE_FUND;

  constructor(public id: number,
              public initializeLogo: boolean,
              public initializeDocs: boolean) {
  }
}

export class FetchSingleFundSuccessAction implements Action {
  readonly type = FETCH_SINGLE_FUND_SUCCESS;

  constructor(public fund: Fund) {
  }
}

export class FetchSingleFundErrorAction implements Action {
  readonly type = FETCH_SINGLE_FUND_ERROR;

  constructor(public errorMessage: string) {
  }
}

export class FetchSortOrdersAction implements Action {
  readonly type = FETCH_SORT_ORDERS;
}

export class FetchSortOrdersSuccessAction implements Action {
  readonly type = FETCH_SORT_ORDERS_SUCCESS;

  constructor(public sortOrders: string[]) {
  }
}

export class FetchLocationsAction implements Action {
  readonly type = FETCH_LOCATIONS;
}

export class FetchLocationsSuccessAction implements Action {
  readonly type = FETCH_LOCATIONS_SUCCESS;

  constructor(public locations: string[]) {
  }
}

export class FetchFundCharityAction implements Action {
  readonly type = FETCH_FUND_CHARITY;
}

export class FetchFundCharitySuccessAction implements Action {
  readonly type = FETCH_FUND_CHARITY_SUCCESS;

  constructor(public charity: Charity[]) {
  }
}

export class DownloadDocAction implements Action {
  readonly type = DOWNLOAD_DOC;

  constructor(public id: number) {
  }
}
