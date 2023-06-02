import {ResponseDocumentInterface} from "../shared/models/response-document.model";

export interface UserAccount {
  id: number,
  email: string,
  firstName: string,
  lastName: string,
  upvoteDate: Date,
  profilePhoto?: ResponseDocumentInterface
}
