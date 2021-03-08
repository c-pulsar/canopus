import { AuthOptions, HttpAuthHandler } from "./HttpAuthHandler";
import { HttpClient } from "./HttpClient";
import { makeRepresentation, validateBody, validateStatus } from "./HttpResponseUtils";
import { Representation } from "./Representation";

export class RestClient {

  private authHandler: HttpAuthHandler;

  constructor(httpClient: HttpClient, options: AuthOptions) {
    this.authHandler = new HttpAuthHandler(httpClient, options);
  }

  get(uri: string) : Promise<Representation> {
      return this.authHandler
        .get(uri)
        .then(validateStatus)
        .then(validateBody)
        .then(makeRepresentation);
  }
}