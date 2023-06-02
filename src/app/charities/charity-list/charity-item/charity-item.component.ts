import {Component, Input, OnInit} from '@angular/core';
import {Charity} from "../../charity.model";
import {toUADateFormat} from "../../../shared/util.functions";
import {ResponseDocument} from "../../../shared/models/response-document.model";

@Component({
  selector: 'app-charity-item',
  templateUrl: './charity-item.component.html',
  styleUrls: ['./charity-item.component.css']
})
export class CharityItemComponent implements OnInit {

  @Input()
  charityItem: Charity;
  imgURL: string;

  protected readonly toUADateFormat = toUADateFormat;

  ngOnInit(): void {
    let reader = new FileReader();

    reader.onload = (event: any) => {
      this.imgURL = event.target.result;
    };

    if (this.charityItem.photo.content !== null)
      reader.readAsDataURL(
        new ResponseDocument(this.charityItem.photo).file
      );
  }
}
