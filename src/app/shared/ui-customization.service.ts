import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: 'root'})
export class UICustomizationService {

  private menuPosition =  new BehaviorSubject<string>('left');

  private selectedTheme = new BehaviorSubject<ColorTheme>(ColorTheme.DEFAULT);

  private defaultThemeProperties: Map<string, string> = new Map<string, string>()
    .set('--header-color', '#00F')
    .set('--bg-color', 'white')
    .set('--main-text-color', '#FFF')
    .set('--sub-text-color', 'black')
    .set('--hover-color', '#0DAEFF')
    .set('--header-active-item-color', '#0D9EFF')
    .set('--active-item-color', '#00F')
    .set('--box-hover', '#00F')
    .set('--box-hover-main-text', '#008')
    .set('--box-hover-category', 'green');

  private darkThemeProperties: Map<string, string> = new Map<string, string>()
    .set('--header-color', '#212121')
    .set('--bg-color', '#AFAFAF')
    .set('--main-text-color', '#DFDFDF')
    .set('--sub-text-color', 'black')
    .set('--hover-color', 'black')
    .set('--header-active-item-color', 'rgba(0,0,0, 0.5)')
    .set('--active-item-color', 'rgba(0,0,0, 0.5)')
    .set('--box-hover', 'white')
    .set('--box-hover-main-text', 'black')
    .set('--box-hover-category', '#5D3232');

  init() {
    if (window.matchMedia) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.selectedTheme.next(ColorTheme.DARK);
        this.darkThemeProperties.forEach((value: string, key: string) => {
          document.documentElement.style.setProperty(key, value);
        });

        return;
      }
    }
    this.selectedTheme.next(ColorTheme.DEFAULT);

    this.defaultThemeProperties.forEach((value: string, key: string) => {
      document.documentElement.style.setProperty(key, value);
    });
  }

  getMenuPosition() {
    return this.menuPosition.asObservable();
  }

  changeMenuPosition() {
    this.menuPosition.next((this.menuPosition.getValue() === 'right') ? 'left' : 'right');
  }

  getTheme() {
    return this.selectedTheme.asObservable();
  }

  changeTheme() {
    if (this.selectedTheme.value === ColorTheme.DEFAULT) {
      this.selectedTheme.next(ColorTheme.DARK);
      this.darkThemeProperties.forEach((value: string, key: string) => {
        document.documentElement.style.setProperty(key, value);
      });
    } else if (this.selectedTheme.value === ColorTheme.DARK) {
      this.selectedTheme.next(ColorTheme.DEFAULT);
      this.defaultThemeProperties.forEach((value: string, key: string) => {
        document.documentElement.style.setProperty(key, value);
      });
    }
  }
}


export enum ColorTheme {
  DEFAULT, DARK
}
