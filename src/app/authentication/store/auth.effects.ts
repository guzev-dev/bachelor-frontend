import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

import * as fromAuthActions from "./auth.actions";
import {catchError, map, of, switchMap, tap, withLatestFrom} from "rxjs";
import {AuthenticatedUser} from "../models/authenticated-user.model";
import {RestApiEndpoints} from "../../shared/rest-api.endpoints";
import {AppState} from "../../app.reducer";
import {AuthState} from "./auth.reducer";
import {Store} from "@ngrx/store";

@Injectable()
export class AuthEffects {

  private storedUserKey = 'authenticatedUser';

  constructor(private action$: Actions,
              private store$: Store<AppState>,
              private httpClient: HttpClient,
              private router: Router) {
  }

  private storeAuthenticatedUser(user: AuthenticatedUser) {
    localStorage.setItem(this.storedUserKey, JSON.stringify(user));
  }

  private handleError = (errorResponse: any) => {
    return of(new fromAuthActions.LoginErrorAction(''));
  }

  login$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromAuthActions.LOGIN),
      switchMap((action: fromAuthActions.LoginAction) => {
        return this.httpClient.post<AuthenticatedUser>(RestApiEndpoints.AUTH.LOGIN, {
          email: action.credentials.email,
          password: action.credentials.password
        })
          .pipe(
            map((user: AuthenticatedUser) => {
              this.storeAuthenticatedUser(user);

              return new fromAuthActions.LoginSuccessAction(user, true);
            }),
            catchError(this.handleError));
      }))
  });

  register$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromAuthActions.REGISTER),
      switchMap((action: fromAuthActions.RegisterAction) => {
        return this.httpClient.post(RestApiEndpoints.AUTH.REGISTER, {
          ...action.registerUser
        })
          .pipe(
            map((response: any) => {
              return {type: 'NO_ACTION'};
            }),
            catchError(this.handleError)
          );
      }))
  });

  confirmRegister$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromAuthActions.CONFIRM_REGISTER),
      switchMap((action: fromAuthActions.ConfirmRegisterAction) => {
        return this.httpClient.post<AuthenticatedUser>(RestApiEndpoints.AUTH.CONFIRM_REGISTER, {
          email: action.confirmInfo.email,
          secretCode: action.confirmInfo.secretCode
        })
          .pipe(
            map((user: AuthenticatedUser) => {
              this.storeAuthenticatedUser(user);

              return new fromAuthActions.LoginSuccessAction(user, true);
            }),
            catchError(this.handleError)
          );
      }))
  });

  loginSucess$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromAuthActions.LOGIN_SUCCESS),
      withLatestFrom(this.store$.select('auth')),
      tap(([action, state]: [fromAuthActions.LoginSuccessAction, AuthState]) => {
        if (action.redirect) {
          if (state.redirectTo)
            this.router.navigate(['../' + state.redirectTo]);
          else
            this.router.navigate(['../../charity']);
        }
      }))
  }, {dispatch: false})

  autoLogin$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromAuthActions.AUTO_LOGIN),
      map(() => {
        const storedUserData = localStorage.getItem(this.storedUserKey);
        if (storedUserData) {
          const authenticatedUser: AuthenticatedUser = JSON.parse(storedUserData);

          return new fromAuthActions.LoginSuccessAction(authenticatedUser, false);
        } else
          return {type: 'NO_ACTION'};
      }))
  });

  logout$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromAuthActions.LOGOUT),
      switchMap(() => {
        return this.httpClient.get(RestApiEndpoints.AUTH.LOGOUT)
          .pipe(
            map((response: any) => {
              localStorage.removeItem(this.storedUserKey);

              window.location.reload();
              return new fromAuthActions.LoginSuccessAction(null, false);
            }),
            catchError(this.handleError)
          );
      })
    )
  });

}
