import {ResponseDocumentInterface} from "../shared/models/response-document.model";

export interface Charity {
  id: number,
  name: string,
  description: string,
  category: { name: string, iconClass: string },
  needToCollect: number,
  collected: number,
  endDate: Date,
  upvotes: number,
  status: { singleName: string, multipleName: string },
  individual: boolean,
  createdBy?: any,
  photo?: ResponseDocumentInterface,
  documents?: ResponseDocumentInterface[]
}
