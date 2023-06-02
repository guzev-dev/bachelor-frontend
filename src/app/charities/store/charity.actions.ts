import {Action} from "@ngrx/store";
import {Category} from "../../shared/models/category.model";
import {Charity} from "../charity.model";
import {Payment} from "../../shared/models/payment.model";

export const FETCH_CHARITIES = '[Charity] Fetch Charities';
export const FETCH_CHARITIES_SUCCESS = '[Charity] Fetch Charities Success';
export const FETCH_CHARITIES_ERROR = '[Charity] Fetch Charities Success';

export const FETCH_CATEGORIES = '[Charity] Fetch Categories';
export const FETCH_CATEGORIES_SUCCESS = '[Charity] Fetch Categories Success';

export const FETCH_STATUSES = '[Charity] Fetch Statuses';
export const FETCH_STATUSES_SUCCESS = '[Charity] Fetch Statuses Success';

export const FETCH_SORT_ORDERS = '[Charity] Fetch Sort Orders';
export const FETCH_SORT_ORDERS_SUCCESS = '[Charity] Fetch Sorted Orders';

export const FETCH_SINGLE_CHARITY = '[Charity] Fetch Charity';
export const FETCH_SINGLE_CHARITY_SUCCESS = '[Charity] Fetch Charity Success';
export const FETCH_SINGLE_CHARITY_ERROR = '[Charity] Fetch Charity Error';

export const FETCH_CHARITY_PAYMENTS = '[Charity] Fetch Payments';
export const FETCH_CHARITY_PAYMENTS_SUCCESS = '[Charity] Fetch Payments Success';

export const DOWNLOAD_DOC = '[Charity] Download Document';

export const VOTE_FOR_CHARITY = '[Charity] Vote For Charity';

export class FetchCharitiesAction implements Action {
  readonly type = FETCH_CHARITIES;

  constructor(public name: string,
              public status: string,
              public category: string,
              public initializePhotos: boolean,
              public page: number,
              public size: number,
              public sortBy: string) {
  }
}

export class FetchCharitiesSuccessAction implements Action {
  readonly type = FETCH_CHARITIES_SUCCESS;

  constructor(public charities: Charity[],
              public firstPage: boolean,
              public lastPage: boolean,
              public page: number) {
  }
}

export class FetchCharitiesErrorAction implements Action {
  readonly type = FETCH_CHARITIES_ERROR;

  constructor(public errorMessage: string) {
  }
}

export class FetchCategoriesAction implements Action {
  readonly type = FETCH_CATEGORIES;
}

export class FetchCategoriesSuccessAction implements Action {
  readonly type = FETCH_CATEGORIES_SUCCESS;

  constructor(public categories: Category[]) {
  }
}

export class FetchStatusesAction implements Action {
  readonly type = FETCH_STATUSES;
}

export class FetchStatusesSuccessAction implements Action {
  readonly type = FETCH_STATUSES_SUCCESS;

  constructor(public statuses: string[]) {
  }
}

export class FetchSortOrdersAction implements Action {
  readonly type = FETCH_SORT_ORDERS;
}

export class FetchSortOrdersSuccessAction implements Action{
  readonly type = FETCH_SORT_ORDERS_SUCCESS;

  constructor(public sortOrders: string[]) {
  }
}

export class FetchSingleCharityAction implements Action {
  readonly type = FETCH_SINGLE_CHARITY;

  constructor(public id: number,
              public initializePhoto: boolean,
              public initializeDocs: boolean) {
  }
}

export class FetchSingleCharitySuccessAction implements Action {
  readonly type = FETCH_SINGLE_CHARITY_SUCCESS;

  constructor(public charity: Charity) {
  }
}

export class FetchSingleCharityErrorAction implements Action {
  readonly type = FETCH_SINGLE_CHARITY_ERROR;

  constructor(public errorMessage: string) {
  }
}

export class FetchCharityPaymentsAction implements Action {
  readonly type = FETCH_CHARITY_PAYMENTS;
}

export class FetchCharityPaymentsSuccessAction implements Action {
  readonly type = FETCH_CHARITY_PAYMENTS_SUCCESS;

  constructor(public payments: Payment[]) {
  }
}

export class DownloadDocumentAction implements Action {
  readonly type = DOWNLOAD_DOC;

  constructor(public documentId: number) {
  }
}

export class VoteForCharityAction implements Action {
  readonly type = VOTE_FOR_CHARITY;

  constructor(public charityId: number) {
  }
}
