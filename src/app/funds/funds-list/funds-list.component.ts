import {Component, OnInit} from '@angular/core';
import {Fund} from "../fund.model";
import {Subscription, take} from "rxjs";
import {UICustomizationService} from "../../shared/ui-customization.service";
import {AppState} from "../../app.reducer";
import {Store} from "@ngrx/store";
import {ActivatedRoute, Params, Router} from "@angular/router";

import * as fromFundActions from "../store/fund.actions";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-funds-list',
  templateUrl: './funds-list.component.html',
  styleUrls: ['./funds-list.component.css']
})
export class FundsListComponent implements OnInit {

  sideMenuRight: boolean = false;
  mobileMenuHidden: boolean = true;

  fundName: string = null;
  selectedOrder: string = null;
  selectedLocation: string;
  page: number;

  sortOrderSelect: string[];
  locations: string[];

  funds: {
    value: Fund[],
    firstPage: boolean,
    lastPage: boolean,
    currentPage: number,
    errorMessage: string
  };

  subs: Subscription[] = [];

  constructor(private uiCustomizationService: UICustomizationService,
              private store: Store<AppState>,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.subs.push(
      this.uiCustomizationService.getMenuPosition()
        .subscribe((position: string) => {
          this.sideMenuRight = position === 'right';
        })
    );

    this.subs.push(
      this.activatedRoute.queryParams
        .pipe(take(1))
        .subscribe(params => {
          this.fundName = params['name'];
          this.selectedLocation = params['location'];
          this.selectedOrder = params['sortBy'];
          this.page = params['page'];
        })
    );

    this.subs.push(
      this.store.select('fund')
        .subscribe((state) => {
          this.sortOrderSelect = state.sortOrders;
          this.locations = state.locations;
          this.funds = state.funds;
        })
    );

    this.store.dispatch(new fromFundActions.FetchSortOrdersAction());
    this.store.dispatch(new fromFundActions.FetchLocationsAction());
    this.dispatchAction();
  }

  dispatchAction() {
    this.store.dispatch(new fromFundActions.FetchFundsAction(this.fundName, this.selectedLocation,
      true, this.page,
      environment.fundsPerPage, this.selectedOrder));
  }

  private changeParams(input: Params) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: input,
      queryParamsHandling: 'merge'
    });
    this.dispatchAction()
  }

  onSearch() {
    if (this.fundName.length <= 3) {
      this.fundName = null;
    }
    this.changeParams({'name': this.fundName});
  }

  onLocationSelect() {
    if (this.selectedLocation === 'Не вибрано') this.selectedLocation = null;
    this.changeParams({'location': this.selectedLocation});
  }

  onSortOrderSelect() {
    this.changeParams({'sortBy': this.selectedOrder});
  }

  clearSelectedLocation() {
    this.selectedLocation = null;
    this.changeParams({'location': this.selectedLocation});
  }

  onPreviousPage() {
    this.changeParams({'page': this.page - 1});
  }

  onNextPage() {
    if (!this.page) this.page = 1;
    this.changeParams({'page': ++this.page});
  }

  changeMobileMenuHidden() {
    this.mobileMenuHidden = !this.mobileMenuHidden;
  }
}
