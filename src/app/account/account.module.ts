import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountPageComponent } from './account-page/account-page.component';
import {RouterModule, Routes} from "@angular/router";
import {authGuard} from "../authentication/auth.guard";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";

const routes: Routes = [
  {path: 'account', pathMatch: 'full', component: AccountPageComponent, canActivate: [authGuard]}
]

@NgModule({
  declarations: [
    AccountPageComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        SharedModule
    ],
  exports: [
    RouterModule
  ]
})
export class AccountModule { }
