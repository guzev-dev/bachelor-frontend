export interface ResponseDocumentInterface {
  id: number,
  name: string,
  documentType: string,
  isInitialized: boolean,
  extension: string,
  content: string
}

export class ResponseDocument {

  private readonly _id: number;
  private readonly _name: string;
  private readonly _documentType: string;
  private readonly _isInitialized: boolean;
  private readonly _extension: string;
  private readonly _content: string;

  constructor(data: ResponseDocumentInterface) {
    this._id = data.id;
    this._name = data.name;
    this._documentType = data.documentType;
    this._isInitialized = data.isInitialized;
    this._extension = data.extension;
    this._content = data.content;
  }

  public get id(): number {
    return this._id;
  }

  public get name(): string {
    if (this._isInitialized)
      return this._name + this._extension;
    else
      return this._name;
  }

  public getDocumentType(): string {
    return this._documentType;
  }

  public get file(): File {

    let result = new File(
      [new Uint8Array(window.atob(this._content).split('').map(str => str.charCodeAt(0)))],
      this._name + this._extension
    );

    return result;
  }
}
