import {Component, OnInit} from '@angular/core';
import {Fund} from "../fund.model";
import {Subscription} from "rxjs";
import {Action, Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";
import {ActivatedRoute} from "@angular/router";

import * as fromFundActions from "../store/fund.actions";
import {ResponseDocument} from "../../shared/models/response-document.model";
import {menuInOutAnimation} from "../../shared/animations/menuInOut.animation";
import {Charity} from "../../charities/charity.model";

@Component({
  selector: 'app-fund-page',
  templateUrl: './fund-page.component.html',
  styleUrls: ['./fund-page.component.css'],
  animations: [menuInOutAnimation]
})
export class FundPageComponent implements OnInit{

  fund: Fund;
  error: string;
  imgURL: string;
  charity: Charity[];

  documentsMenuOpen: boolean = false;
  contactInfoMenuOpen: boolean = false;
  charityMenuOpen: boolean = false;

  subs: Subscription[] = [];

  constructor(private store: Store<AppState>,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subs.push(
      this.activatedRoute.params
        .subscribe(params => {
          if (!this.fund || this.fund.id !== +params['id']) {
            this.store.dispatch(new fromFundActions.FetchSingleFundAction(+params['id'], true, true));
          }
        })
    );


    this.subs.push(
      this.store.select('fund')
        .subscribe(state => {
          this.fund = state.fund.value;
          if (this.fund)
            this.readPhoto();
          this.charity = state.fund.charity;
          this.error = state.fund.errorMessage;
        })
    );
  }

  onOpenContactInfoMenu() {
    this.contactInfoMenuOpen = !this.contactInfoMenuOpen;
  }

  onOpenCloseDocumentsMenu() {
    this.documentsMenuOpen = !this.documentsMenuOpen;
  }

  onOpenCloseCharityMenu() {
    this.charityMenuOpen = !this.charityMenuOpen;
    if (!this.charity) this.store.dispatch(new fromFundActions.FetchFundCharityAction());
  }

  downloadDocumentFunction(id: number): Action {
    return new fromFundActions.DownloadDocAction(id);
  }

  joinedStringArray(strings: string[]) {
    return strings.join(', ');
  }

  categoriesArrayToStringArray(categories: { name: string, iconClass: string }[]) {
    return categories.map(c => c.name);
  }

  private readPhoto(): void {
    let reader = new FileReader();

    reader.onload = (event: any) => {
      this.imgURL = event.target.result;
    };

    if (this.fund.logo.content)
      reader.readAsDataURL(
        new ResponseDocument(this.fund.logo).file
      );
  }

}
