import {Component, OnInit} from '@angular/core';
import {UICustomizationService} from "./shared/ui-customization.service";
import {AppState} from "./app.reducer";
import {Store} from "@ngrx/store";

import * as fromAuthActions from "../app/authentication/store/auth.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{

  constructor(private colorThemeService: UICustomizationService,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.colorThemeService.init();

    this.store.dispatch(new fromAuthActions.AutoLoginAction());
  }
}
