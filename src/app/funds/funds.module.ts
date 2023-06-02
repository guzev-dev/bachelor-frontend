import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { FundPageComponent } from './fund-page/fund-page.component';
import {SharedModule} from "../shared/shared.module";
import {CharityModule} from "../charities/charity.module";
import { FundsListComponent } from './funds-list/funds-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FundItemComponent } from './funds-list/fund-item/fund-item.component';

const routes: Routes = [
  { path: 'funds', component: FundsListComponent},
  { path: 'funds/:id', component: FundPageComponent}
];

@NgModule({
  declarations: [
    FundPageComponent,
    FundsListComponent,
    FundItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    CharityModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    RouterModule
  ]
})
export class FundsModule { }
