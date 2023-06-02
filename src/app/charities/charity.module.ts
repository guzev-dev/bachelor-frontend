import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CharityItemComponent} from "./charity-list/charity-item/charity-item.component";
import { CharityListComponent } from './charity-list/charity-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import { CharityPageComponent } from './charity-page/charity-page.component';
import {SharedModule} from "../shared/shared.module";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'charity'},
  {path: 'charity', component: CharityListComponent},
  {path: 'charity/:id', component: CharityPageComponent},
]

@NgModule({
  declarations: [
    CharityItemComponent,
    CharityListComponent,
    CharityPageComponent
  ],
  exports: [
    RouterModule,
    CharityItemComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        SharedModule,
        ReactiveFormsModule
    ]
})
export class CharityModule { }
