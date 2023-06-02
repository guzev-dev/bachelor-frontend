import {Component, Input} from '@angular/core';
import {ResponseDocumentInterface} from "../../models/response-document.model";
import {Action, Store} from "@ngrx/store";
import {AppState} from "../../../app.reducer";

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent {

  @Input()
  documents: ResponseDocumentInterface[];

  @Input()
  onClick: (id: number) => Action;

  constructor(private store: Store<AppState>) {
  }

  documentClick(file: ResponseDocumentInterface) {
    let action: Action = this.onClick(file.id);
    console.log(action)
    this.store.dispatch(action);
  }

}
