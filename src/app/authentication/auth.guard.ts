import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {inject} from "@angular/core";
import {AppState} from "../app.reducer";
import {Store} from "@ngrx/store";
import {map, Observable, take} from "rxjs";
import {AuthState} from "./store/auth.reducer";

import * as fromAuthActions from "./store/auth.actions";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {

  const store$: Store<AppState> = inject(Store<AppState>);
  const router: Router = inject(Router);

  store$.dispatch(new fromAuthActions.RedirectLoginAction(route.url.map(segment => segment.path).join('/')));

  return store$.select('auth').pipe(
    take(1),
    map((authState: AuthState) => {
      return authState.authenticatedUser;
    }),
    map((user) => {
      const isAuthorized = !!user;
      if (isAuthorized)
        return true;
      else
        return router.createUrlTree(['../account/login']);
    })
  )
};

