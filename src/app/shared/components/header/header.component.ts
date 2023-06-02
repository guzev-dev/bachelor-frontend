import {Component, OnInit} from '@angular/core';
import {ColorTheme, UICustomizationService} from "../../ui-customization.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  theme: string;
  sideBarPosition: string;

  constructor(private uiCustomizationService: UICustomizationService) {
  }

  onChangeTheme() {
    this.uiCustomizationService.changeTheme();
  }

  onChangeSideBarPosition() {
    this.uiCustomizationService.changeMenuPosition();
  }

  ngOnInit(): void {
    this.uiCustomizationService.getTheme()
      .subscribe(newTheme => {
        this.theme = (newTheme === ColorTheme.DARK) ? 'dark' : 'default';
      });

    this.uiCustomizationService.getMenuPosition()
      .subscribe((position: string) => {
        this.sideBarPosition = position;
      });
  }
}
