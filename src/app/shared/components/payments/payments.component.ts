import {Component, Input} from '@angular/core';
import {Payment} from "../../models/payment.model";
import {numberWithSpaces} from "../../util.functions";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent {

  @Input()
  payments: Payment[];

  protected readonly numberWithSpaces = numberWithSpaces;

}
