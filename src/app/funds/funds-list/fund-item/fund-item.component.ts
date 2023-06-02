import {Component, Input, OnInit} from '@angular/core';
import {Fund} from "../../fund.model";
import {ResponseDocument} from "../../../shared/models/response-document.model";

@Component({
  selector: 'app-fund-item',
  templateUrl: './fund-item.component.html',
  styleUrls: ['./fund-item.component.css']
})
export class FundItemComponent implements OnInit {

  @Input()
  fundItem: Fund;
  imgURL: string;

  ngOnInit(): void {
    let reader = new FileReader();

    reader.onload = (event: any) => {
      this.imgURL = event.target.result;
    }

    if (this.fundItem.logo.content !== null)
      reader.readAsDataURL(
        new ResponseDocument(this.fundItem.logo).file
      );

  }

}
