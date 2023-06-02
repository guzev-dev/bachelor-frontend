import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {HttpClient, HttpParams} from "@angular/common/http";
import {AppState} from "../../app.reducer";
import {Store} from "@ngrx/store";

import * as fromCharityActions from "./charity.actions";
import * as fromAccountActions from "../../account/store/account.actions";
import {catchError, map, of, switchMap, tap, withLatestFrom} from "rxjs";
import {CharityState} from "./charity.reducer";
import {Category} from "../../shared/models/category.model";
import {RestApiEndpoints} from "../../shared/rest-api.endpoints";
import {Charity} from "../charity.model";
import {Payment} from "../../shared/models/payment.model";
import {ResponseDocument, ResponseDocumentInterface} from "../../shared/models/response-document.model";

@Injectable()
export class CharityEffects {

  constructor(private action$: Actions,
              private httpClient: HttpClient,
              private store: Store<AppState>) {
  }

  fetchCategories$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromCharityActions.FETCH_CATEGORIES),
      withLatestFrom(this.store.select('charity')),
      switchMap(([action, state]: [fromCharityActions.FetchCategoriesAction, CharityState]) => {
        if (state.categories && state.categories.length !== 0)
          return of({type: 'NO_ACTION'});
        else
          return this.httpClient.get<Category[]>(RestApiEndpoints.CHARITY.CATEGORIES)
            .pipe(
              map((result: Category[]) => {
                return new fromCharityActions.FetchCategoriesSuccessAction(result);
              }));
      }))
  });

  fetchStatuses$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromCharityActions.FETCH_STATUSES),
      withLatestFrom(this.store.select('charity')),
      switchMap(([action, state]: [fromCharityActions.FetchStatusesAction, CharityState]) => {
        if (state.statuses && state.statuses.length !== 0)
          return of({type: 'NO_ACTION'});
        else
          return this.httpClient.get<{ singleName: string, multipleName: string }[]>(RestApiEndpoints.CHARITY.STATUSES)
            .pipe(
              map((result) => {
                return new fromCharityActions.FetchStatusesSuccessAction(
                  result.map(status => status.multipleName)
                );
              }));
      }))
  });

  fetchOrders$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromCharityActions.FETCH_SORT_ORDERS),
      withLatestFrom(this.store.select('charity')),
      switchMap(([action, state]: [fromCharityActions.FetchSortOrdersAction, CharityState]) => {
        if (state.sortOrders && state.sortOrders.length !== 0)
          return of({type: 'NO_ACTION'});
        else
          return this.httpClient.get<string[]>(RestApiEndpoints.CHARITY.ORDERS)
            .pipe(
              map((result: string[]) => {
                return new fromCharityActions.FetchSortOrdersSuccessAction(result);
              }));
      }))
  });

  fetchCharities$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromCharityActions.FETCH_CHARITIES),
      switchMap((action: fromCharityActions.FetchCharitiesAction) => {
        let params: HttpParams = new HttpParams();
        if (action.name) params = params.set('name', action.name);
        if (action.status) params = params.set('status', action.status);
        if (action.category) params = params.set('category', action.category);
        if (action.initializePhotos !== null && action.initializePhotos !== undefined)
          params = params.set('initializePhotos', action.initializePhotos);
        if (action.page) params = params.set('page', action.page);
        if (action.size) params = params.set('size', action.size);
        if (action.sortBy) params = params.set('sortBy', action.sortBy);

        return this.httpClient.get<{
          content: Charity[],
          first: boolean,
          last: boolean,
          number: number
        }>(RestApiEndpoints.CHARITY.CHARITIES, {
          params: params
        })
          .pipe(
            map((result) => {
              return new fromCharityActions.FetchCharitiesSuccessAction(result.content, result.first,
                result.last, result.number);
            }),
            catchError((errorResponse: any) => {
              return of(new fromCharityActions.FetchCharitiesErrorAction(''));
            })
          );
      }))
  });

  fetchSingleCharity$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromCharityActions.FETCH_SINGLE_CHARITY),
      switchMap((action: fromCharityActions.FetchSingleCharityAction) => {
        let params: HttpParams = new HttpParams();
        if (action.initializePhoto !== null && action.initializePhoto !== undefined)
          params = params.set('initializePhoto', action.initializePhoto);
        if (action.initializeDocs !== null && action.initializeDocs !== undefined)
          params = params.set('initializeDocs', action.initializeDocs);

        return this.httpClient.get<Charity>(RestApiEndpoints.CHARITY.SINGLE_CHARITY + action.id, {
          params: params
        })
          .pipe(
            map((result: Charity) => {
              return new fromCharityActions.FetchSingleCharitySuccessAction(result);
            }),
            catchError((errorResponse: any) => {
              return of(new fromCharityActions.FetchSingleCharityErrorAction(''));
            })
          );
      }))
  });

  fetchPayments$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromCharityActions.FETCH_CHARITY_PAYMENTS),
      withLatestFrom(this.store.select('charity')),
      switchMap(([action, state]: [fromCharityActions.FetchCharityPaymentsAction, CharityState]) => {
        return this.httpClient.get<{ content: Payment[] }>(RestApiEndpoints.PAYMENTS.CHARITY + state.charity.value.id)
          .pipe(
            map((result: { content: Payment[] }) => {
              return new fromCharityActions.FetchCharityPaymentsSuccessAction(result.content);
            })
          );
      }))
  });

  downloadDocument = createEffect(() => {
    return this.action$.pipe(
      ofType(fromCharityActions.DOWNLOAD_DOC),
      tap((action: fromCharityActions.DownloadDocumentAction) => {
        return this.httpClient.get<ResponseDocumentInterface>(RestApiEndpoints.CHARITY.DOCUMENT_BODY + action.documentId)
          .subscribe((result: ResponseDocumentInterface) => {
            let file = new ResponseDocument(result);
            let link = document.createElement('a');
            link.href = window.URL.createObjectURL(file.file);
            let fileName = file.name;
            link.download = fileName;
            link.click();
          });
      }))
  }, {dispatch: false});

  voteForCharity$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromCharityActions.VOTE_FOR_CHARITY),
      withLatestFrom(this.store.select('charity')),
      switchMap(([action, state] : [fromCharityActions.VoteForCharityAction, CharityState]) => {
        return this.httpClient.patch<{accepted: boolean}>(RestApiEndpoints.CHARITY.VOTE(action.charityId), {})
          .pipe(
            map((result: {accepted: boolean}) => {
              if (result.accepted) {
                window.location.reload();
                return new fromAccountActions.VotedAction();
              } else
                return {type: 'NO_ACTION'};
            })
          );
      }))
  });

}
