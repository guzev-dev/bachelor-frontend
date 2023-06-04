import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserAccount} from "../user-account.model";
import {AppState} from "../../app.reducer";
import {Store} from "@ngrx/store";
import {ResponseDocument} from "../../shared/models/response-document.model";
import {menuInOutAnimation} from "../../shared/animations/menuInOut.animation";

import * as fromAccountActions from "../store/account.actions";
import * as fromAuthActions from "../../authentication/store/auth.actions";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Payment} from "../../shared/models/payment.model";

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css'],
  animations: [menuInOutAnimation]
})
export class AccountPageComponent implements OnInit, OnDestroy {

  account: UserAccount;
  imgURL: string;

  changePasswordMenuOpen: boolean = false;
  passwordChanged: boolean;
  changePasswordForm: FormGroup;

  paymentsMenuOpen: boolean = false;
  payments: Payment[];


  subs: Subscription[] = [];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.subs.push(
      this.store.select('account').subscribe(
        (state) => {
          this.account = state.account;
          this.passwordChanged = state.passwordChanged;
          if (state.accountPayments)
            this.payments = state.accountPayments.map(payment => {
              return {
                ...payment,
                paidBy: {firstName: this.account.firstName, lastName: this.account.lastName},
                anonymously: false
              };
            });
          if (this.account)
            this.readPhoto()
        }
      )
    );

    if (!this.account)
      this.store.dispatch(new fromAccountActions.FetchDataAction(true));
  }

  ngOnDestroy(): void {
    this.subs.map(sub => sub.unsubscribe());

    this.store.dispatch(new fromAccountActions.ClearDataAction());
  }

  onLogout(): void {
    this.store.dispatch(new fromAuthActions.LogoutAction());
  }

  onOpenCloseChangePasswordMenu() {
    this.changePasswordMenuOpen = !this.changePasswordMenuOpen;
    if (this.changePasswordMenuOpen)
      this.changePasswordForm = new FormGroup({
        oldPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
        newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
        newPasswordCheck: new FormControl('', [Validators.required, Validators.minLength(8)])
      });
    else
      this.changePasswordForm = null;
  }

  onOpenClosePaymentsMenu() {
    this.paymentsMenuOpen = !this.paymentsMenuOpen;
    if (this.paymentsMenuOpen && !this.payments)
      this.store.dispatch(new fromAccountActions.FetchUserPaymentsAction());
  }

  onChangePassword(): void {
    if (this.changePasswordForm.valid || this.newPasswordsMatch()) {
      const oldPassword: string = this.changePasswordForm.get('oldPassword').value,
        newPassword: string = this.changePasswordForm.get('newPassword').value;

      this.store.dispatch(new fromAccountActions.ChangePasswordAction(oldPassword, newPassword));
    }
  }

  newPasswordsMatch() {
    const newPassword: string = this.changePasswordForm.get('newPassword').value,
      newPasswordCheck: string = this.changePasswordForm.get('newPasswordCheck').value;

    return !(this.changePasswordForm.get('newPassword').touched
      && this.changePasswordForm.get('newPasswordCheck').touched
      && newPassword !== newPasswordCheck);
  }

  oldPasswordInvalid() {
    return (this.changePasswordForm.get('oldPassword').touched && this.changePasswordForm.get('oldPassword').invalid);
  }

  newPasswordInvalid() {
    return (this.changePasswordForm.get('newPassword').touched && this.changePasswordForm.get('newPassword').invalid);
  }

  newPasswordCheckInvalid() {
    return (this.changePasswordForm.get('newPasswordCheck').touched && this.changePasswordForm.get('newPasswordCheck').invalid);
  }

  private readPhoto(): void {
    let reader = new FileReader();

    reader.onload = (event: any) => {
      this.imgURL = event.target.result;
    };

    if (this.account.profilePhoto.content)
      reader.readAsDataURL(
        new ResponseDocument(this.account.profilePhoto).file
      );
  }

}
