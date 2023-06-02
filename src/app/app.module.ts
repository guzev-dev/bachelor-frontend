import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {CharityModule} from "./charities/charity.module";
import {AuthModule} from "./authentication/auth.module";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {CommonModule} from "@angular/common";
import {appReducer} from "./app.reducer";
import {AuthEffects} from "./authentication/store/auth.effects";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./authentication/auth.interceptor";
import {AccountModule} from "./account/account.module";
import {AccountEffects} from "./account/store/account.effects";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SharedModule} from "./shared/shared.module";
import {CharityEffects} from "./charities/store/charity.effects";
import {FundsModule} from "./funds/funds.module";
import {FundEffects} from "./funds/store/fund.effects";

@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    SharedModule,
    CharityModule,
    AuthModule,
    AccountModule,
    FundsModule,
    StoreModule.forRoot(appReducer),
    RouterModule.forRoot([]),
    EffectsModule.forRoot([AccountEffects, AuthEffects, CharityEffects, FundEffects])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
