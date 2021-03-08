import { AuthOptions, HttpAuthHandler } from "./HttpAuthHandler";
import { HttpClient } from "./HttpClient";
import { makeRepresentation, validateBody, validateStatus } from "./HttpResponseUtils";

export class RestClient {

  private authHandler: HttpAuthHandler;

  constructor(httpClient: HttpClient, options: AuthOptions) {
    this.authHandler = new HttpAuthHandler(httpClient, options);
  }

  get(uri: string) : Promise<any> {
      return this.authHandler
        .get(uri)
        .then(validateStatus)
        .then(validateBody)
        .then(makeRepresentation);
  }
}