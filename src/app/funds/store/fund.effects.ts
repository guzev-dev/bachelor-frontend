import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {HttpClient, HttpParams} from "@angular/common/http";

import * as fromFundActions from "./fund.actions";
import {catchError, map, of, switchMap, tap, withLatestFrom} from "rxjs";
import {AppState} from "../../app.reducer";
import {Store} from "@ngrx/store";
import {FundState} from "./fund.reducer";
import {RestApiEndpoints} from "../../shared/rest-api.endpoints";
import {Fund} from "../fund.model";
import {ResponseDocument, ResponseDocumentInterface} from "../../shared/models/response-document.model";
import {Charity} from "../../charities/charity.model";

@Injectable()
export class FundEffects {

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<AppState>) {
  }

  fetchLocations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromFundActions.FETCH_LOCATIONS),
      withLatestFrom(this.store.select('fund')),
      switchMap(([action, state]: [fromFundActions.FetchLocationsAction, FundState]) => {
        if (state.locations && state.locations.length !== 0)
          return of({type: 'NO_ACTION'});
        else
          return this.httpClient.get<string[]>(RestApiEndpoints.FUNDS.LOCATIONS)
            .pipe(
              map((result: string[]) => {
                return new fromFundActions.FetchLocationsSuccessAction(result);
              }));
      }))
  });

  fetchOrders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromFundActions.FETCH_SORT_ORDERS),
      withLatestFrom(this.store.select('fund')),
      switchMap(([action, state]: [fromFundActions.FetchSortOrdersAction, FundState]) => {
        if (state.sortOrders && state.sortOrders.length !== 0)
          return of({type: 'NO_ACTION'});
        else
          return this.httpClient.get<string[]>(RestApiEndpoints.FUNDS.ORDERS)
            .pipe(
              map((result: string[]) => {
                return new fromFundActions.FetchSortOrdersSuccessAction(result);
              }));
      }))
  });

  fetchFunds$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromFundActions.FETCH_FUNDS),
      switchMap((action: fromFundActions.FetchFundsAction) => {
        let params = new HttpParams();
        if (action.name) params = params.set('name', action.name);
        if (action.location) params = params.set('location', action.location);
        if (action.initializeLogos) params = params.set('initializeLogos', action.initializeLogos);
        if (action.page) params = params.set('page', action.page);
        if (action.size) params = params.set('size', action.size);
        if (action.sortBy) params = params.set('sortBy', action.sortBy);

        return this.httpClient.get<{
          content: Fund[],
          first: boolean,
          last: boolean,
          number: number
        }>(RestApiEndpoints.FUNDS.FUNDS, {
          params: params
        })
          .pipe(
            map((result) => {
              return new fromFundActions.FetchFundsSuccessAction(result.content, result.first,
                result.last, result.number);
            }),
            catchError((error) => of(new fromFundActions.FetchFundsErrorAction(error)))
          );
      }))
  });

  fetchSingleFund$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromFundActions.FETCH_SINGLE_FUND),
      switchMap((action: fromFundActions.FetchSingleFundAction) => {
        let params = new HttpParams();
        if (action.initializeLogo !== null && action.initializeLogo !== undefined)
          params = params.set('initializeLogo', action.initializeLogo);
        if (action.initializeDocs !== null && action.initializeDocs !== undefined)
          params = params.set('initializeDocs', action.initializeDocs);

        return this.httpClient.get<Fund>(RestApiEndpoints.FUNDS.SINGLE_FUND(action.id), {
          params: params
        })
          .pipe(
            map((result) => {
              return new fromFundActions.FetchSingleFundSuccessAction(result);
            }),
            catchError((error) => of(new fromFundActions.FetchSingleFundErrorAction(error)))
          );
      }))
  });

  fetchFundCharity$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromFundActions.FETCH_FUND_CHARITY),
      withLatestFrom(this.store.select('fund')),
      switchMap(([action, state]: [fromFundActions.FetchFundCharityAction, FundState]) => {
        return this.httpClient.get<{ content: Charity[] }>(RestApiEndpoints.CHARITY.FUND_CHARITY(state.fund.value.id), {
          params: new HttpParams()
            .set('initializePhotos', true)
            .set('size', 10)
        })
          .pipe(
            map((result: { content: Charity[] }) => {
              return new fromFundActions.FetchFundCharitySuccessAction(result.content);
            })
          );
      }))
  });

  downloadDocument$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromFundActions.DOWNLOAD_DOC),
      tap((action: fromFundActions.DownloadDocAction) => {
        return this.httpClient.get<ResponseDocumentInterface>(RestApiEndpoints.FUNDS.DOCUMENT_BODY(action.id))
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

}
