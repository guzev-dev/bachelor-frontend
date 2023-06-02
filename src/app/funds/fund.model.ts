import {UserAccount} from "../account/user-account.model";
import {ResponseDocumentInterface} from "../shared/models/response-document.model";

export interface Fund {
  id: number,
  name: string,
  description: string,
  contactNumber: string,
  locations: string[],
  categories: { name: string, iconClass: string }[],
  moderator?: UserAccount,
  logo?: ResponseDocumentInterface,
  documents?: ResponseDocumentInterface[]
}
