import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginPageComponent} from "./login-page/login-page.component";
import { RegisterPageComponent } from './register-page/register-page.component';
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  { path: 'account/login', component: LoginPageComponent},
  { path: 'account/register', component: RegisterPageComponent}
]

@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent
  ],
    exports: [
      RouterModule
    ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class AuthModule { }
