import {animate, style, transition, trigger} from "@angular/animations";

export const menuInOutAnimation = trigger('menuInOut',
  [
    transition(':enter',
      [
        style({'max-height': 0, opacity: 0}),
        animate('1s ease-out',
          style({'max-height': '100vh', opacity: '100%'})),
      ]
    ),
    transition(':leave',
      [
        style({'max-height': '100vh', opacity: '100%'}),
        animate('1s ease-out',
          style({'max-height': 0, opacity: 0}))
      ]
    ),
  ]
)
