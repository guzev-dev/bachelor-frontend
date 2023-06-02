import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {HttpClient, HttpParams} from "@angular/common/http";

import * as fromAccountActions from "./account.actions";
import {catchError, map, of, switchMap, withLatestFrom} from "rxjs";
import {UserAccount} from "../user-account.model";
import {RestApiEndpoints} from "../../shared/rest-api.endpoints";
import {Payment} from "../../shared/models/payment.model";
import {AppState} from "../../app.reducer";
import {Store} from "@ngrx/store";
import {AuthState} from "../../authentication/store/auth.reducer";

@Injectable()
export class AccountEffects {

  constructor(private action$: Actions,
              private httpClient: HttpClient,
              private store$: Store<AppState>) {
  }

  fetchData$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromAccountActions.FETCH_DATA),
      switchMap((action: fromAccountActions.FetchDataAction) => {
        return this.httpClient.get<UserAccount>(RestApiEndpoints.ACCOUNT.FETCH, {
          params: new HttpParams()
            .set('initializePhoto', action.initializePhoto)
        })
          .pipe(
            map((account: UserAccount) => {

              return new fromAccountActions.FetchDataSuccessAction(account);
            }),
            catchError((errorResponse: any) => {
              return of(new fromAccountActions.FetchDataErrorAction(''));
            })
          );
      }))
  });

  fetchUserPayments$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromAccountActions.FETCH_USER_PAYMENTS),
      switchMap((action: fromAccountActions.FetchUserPaymentsAction) => {
        return this.httpClient.get<{ content: Payment[] }>(RestApiEndpoints.PAYMENTS.USER, {
          params: new HttpParams()
            .set('size', 10)
        })
          .pipe(
            map((result: { content: Payment[] }) => {
              return new fromAccountActions.FetchUserPaymentsSuccessAction(result.content);
            }),
            catchError((errorResponse: any) => {
              return of(new fromAccountActions.FetchDataErrorAction(''));
            })
          );
      }))
  });

  changePassword$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromAccountActions.CHANGE_PASSWORD),
      switchMap((action: fromAccountActions.ChangePasswordAction) => {
        return this.httpClient.put<{ passwordChanged: boolean }>(RestApiEndpoints.ACCOUNT.CHANGE_PASS, {}, {
          params: new HttpParams()
            .set('oldPassword', action.oldPassword)
            .set('newPassword', action.newPassword)
        })
          .pipe(
            map((result) => {
              if (result.passwordChanged)
                return new fromAccountActions.ChangePasswordSuccessAction();
              else
                return new fromAccountActions.ChangePasswordErrorAction();
            }),
            catchError(() => {
              return of(new fromAccountActions.ChangePasswordErrorAction());
            })
          )
      }))
  });

  voteAvailable$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromAccountActions.CHECK_VOTE_AVAILABLE),
      withLatestFrom(this.store$.select('auth')),
      switchMap(([action, state]: [fromAccountActions.CheckVoteAvailableAction, AuthState]) => {
        if (state.authenticatedUser)
          return this.httpClient.get<{ canVote: boolean }>(RestApiEndpoints.ACCOUNT.VOTE_AVAILABLE)
            .pipe(
              map((result: { canVote: boolean }) => {
                return new fromAccountActions.CheckVoteAvailableResultAction(result.canVote);
              })
            );
        else
          return of(new fromAccountActions.CheckVoteAvailableResultAction(false));
      }))
  });

}
