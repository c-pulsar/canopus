import { AuthOptions, HttpAuthHandler } from "./HttpAuthHandler";
import { HttpClient } from "./HttpClient";
import { makeRepresentation, validateBody, validateStatus } from "./HttpResponseUtils";
import { Representation } from "./Representation";
import { RestApi } from "./RestApi";

export class RestClient implements RestApi {

  private authHandler: HttpAuthHandler;

  constructor(httpClient: HttpClient, options: AuthOptions) {
    this.authHandler = new HttpAuthHandler(httpClient, options);
  }

  relation(rel: string, representation: Representation): Promise<Representation> {
    var linkRelation = representation._links.find(x => x.rel === rel);
    if (linkRelation) {
      return this.get(linkRelation.href);
    }

    throw new Error(`Relation ${rel} not found`);
  }

  get(uri: string) : Promise<Representation> {
      return this.authHandler
        .get(uri)
        .then(validateStatus)
        .then(validateBody)
        .then(makeRepresentation);
  }
}