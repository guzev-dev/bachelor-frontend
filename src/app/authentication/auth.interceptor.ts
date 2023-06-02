import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthenticatedUser} from "./models/authenticated-user.model";
import {AppState} from "../app.reducer";
import {Store} from "@ngrx/store";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private authenticatedUser: AuthenticatedUser;

  constructor(private store$: Store<AppState>) {
    this.store$.select('auth').subscribe(
      (state) => {
        this.authenticatedUser = state.authenticatedUser;
      }
    )
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authenticatedUser) {
      const modifiedReq: HttpRequest<any> = req.clone({
        setHeaders: {'Authorization': 'CHARITY_APP_' + this.authenticatedUser.token}
      });
      return next.handle(modifiedReq);
    }

    return next.handle(req);
  }

}
