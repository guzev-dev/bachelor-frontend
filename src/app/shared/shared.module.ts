import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./components/header/header.component";
import {PaymentsComponent} from "./components/payments/payments.component";
import {RouterModule} from "@angular/router";
import { DocumentsComponent } from './components/documents/documents.component';



@NgModule({
  declarations: [
    HeaderComponent,
    PaymentsComponent,
    DocumentsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
    exports: [
        HeaderComponent,
        PaymentsComponent,
        DocumentsComponent
    ]
})
export class SharedModule { }
