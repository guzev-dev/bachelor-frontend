import {Component, OnInit} from '@angular/core';
import {Charity} from "../charity.model";
import {AppState} from "../../app.reducer";
import {Action, Store} from "@ngrx/store";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

import * as fromCharityActions from "../store/charity.actions";
import * as fromAccountActions from "../../account/store/account.actions";
import {ResponseDocument} from "../../shared/models/response-document.model";
import {menuInOutAnimation} from "../../shared/animations/menuInOut.animation";
import {numberWithSpaces} from "../../shared/util.functions";
import {Payment} from "../../shared/models/payment.model";

@Component({
  selector: 'app-charity-page',
  templateUrl: './charity-page.component.html',
  styleUrls: ['./charity-page.component.css'],
  animations: [menuInOutAnimation]
})
export class CharityPageComponent implements OnInit {

  charity: Charity;
  error: string;
  imgURL: string;
  payments: Payment[];

  canVote: boolean;

  paymentsMenuOpen: boolean = false;
  documentsMenuOpen: boolean = false;
  donateModal: boolean = false;

  subs: Subscription[] = [];

  constructor(private store: Store<AppState>,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subs.push(
      this.activatedRoute.params
        .subscribe(params => {
          if (!this.charity || this.charity.id !== +params['id']) {
            this.store.dispatch(new fromCharityActions.FetchSingleCharityAction(+params['id'], true, true));
          }
        })
    );

    this.subs.push(
      this.store.select('charity')
        .subscribe(state => {
          this.charity = state.charity.value;
          if (this.charity)
            this.readPhoto();
          if (state.charity.payments)
            this.payments = state.charity.payments.map(p => {
              return {
                ...p,
                refersTo: {
                  id: null,
                  name: 'Поточний'
                }
              };
            });
          this.error = state.charity.errorMessage;
        })
    );

    this.subs.push(
      this.store.select('account')
        .subscribe(state => {
          this.canVote = state.canVote
        })
    );

    this.store.dispatch(new fromAccountActions.CheckVoteAvailableAction());
  }

  voteForCharity() {
    this.store.dispatch(new fromCharityActions.VoteForCharityAction(this.charity.id));
  }

  onOpenClosePaymentsMenu() {
    this.paymentsMenuOpen = !this.paymentsMenuOpen;
    if (!this.payments) this.store.dispatch(new fromCharityActions.FetchCharityPaymentsAction());
  }

  onOpenCloseDocumentsMenu() {
    this.documentsMenuOpen = !this.documentsMenuOpen;
  }

  downloadDocumentFunction(id: number): Action {
    return new fromCharityActions.DownloadDocumentAction(id);
  }

  private readPhoto(): void {
    let reader = new FileReader();

    reader.onload = (event: any) => {
      this.imgURL = event.target.result;
    };

    if (this.charity.photo.content)
      reader.readAsDataURL(
        new ResponseDocument(this.charity.photo).file
      );
  }

  protected readonly numberWithSpaces = numberWithSpaces;
}
