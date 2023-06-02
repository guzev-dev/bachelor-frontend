import {Component, OnInit} from '@angular/core';
import {UICustomizationService} from "../../shared/ui-customization.service";
import {Category} from "../../shared/models/category.model";
import {Subscription, take} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";


import * as fromCharityActions from "../store/charity.actions";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {Charity} from "../charity.model";

@Component({
  selector: 'app-charity-list',
  templateUrl: './charity-list.component.html',
  styleUrls: ['./charity-list.component.css']
})
export class CharityListComponent implements OnInit {

  sideMenuRight: boolean = false;
  mobileMenuHidden: boolean = true;

  charityName: string = null;
  selectedCategory: string = null;
  selectedOrder: string = null;
  selectedStatus: string = null;
  page: number;

  sortOrderSelect: string[];
  statusSelect: string[];
  categories: Category[];

  charities: {
    value: Charity[],
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
          this.charityName = params['name'];
          this.selectedCategory = params['category'];
          this.selectedOrder = params['sortBy'];
          this.selectedStatus = params['status'];
          this.page = params['page'];
        })
    )

    this.subs.push(
      this.store.select('charity')
        .subscribe((state) => {
          this.sortOrderSelect = state.sortOrders;
          this.statusSelect = state.statuses;
          this.categories = state.categories;
          this.charities = state.charities;
        })
    );

    this.store.dispatch(new fromCharityActions.FetchSortOrdersAction());
    this.store.dispatch(new fromCharityActions.FetchStatusesAction());
    this.store.dispatch(new fromCharityActions.FetchCategoriesAction());
    this.dispatchAction()
  }

  dispatchAction() {
    this.store.dispatch(
      new fromCharityActions.FetchCharitiesAction(this.charityName, this.selectedStatus,
        this.selectedCategory, true, (this.page) ? this.page - 1 : 0,
        environment.charitiesPerPage, this.selectedOrder)
    );
  }

  private changeParams(input: Params){
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: input,
      queryParamsHandling: 'merge'
    });
    this.dispatchAction();
  }

  onSearch() {
    if (this.charityName.length <= 3) {
      this.charityName = null;
    }
    this.changeParams({'name': this.charityName});
  }

  onCategorySelect() {
    this.changeParams({'category': this.selectedCategory});
  }

  clearSelectedCategory() {
    this.selectedCategory = null;
    this.changeParams({'category': this.selectedCategory});
  }

  onStatusSelect() {
    this.changeParams({'status': this.selectedStatus});
  }

  onSortOrderSelect() {
    this.changeParams({'sortBy': this.selectedOrder});
  }

  onPreviousPage() {
    this.changeParams({'page': --this.page});
  }

  onNextPage() {
    if (!this.page) this.page = 1;
    this.changeParams({'page': ++this.page});
  }

  changeMobileMenuHidden() {
    this.mobileMenuHidden = !this.mobileMenuHidden;
  }

}
