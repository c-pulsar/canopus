import { AuthOptions, HttpAuthHandler } from "./HttpAuthHandler";
import { HttpClient } from "./HttpClient";
import { createdOrUndefined, makeAny, makeRepresentation, validateBody, validateStatus } from "./HttpResponseUtils";
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

  getAny(uri: string): Promise<any> {
    return this.authHandler
      .get(uri)
      .then(validateStatus)
      .then(validateBody)
      .then(makeAny);
  }

  get(uri: string): Promise<Representation> {
    return this.authHandler
      .get(uri)
      .then(validateStatus)
      .then(validateBody)
      .then(makeRepresentation);
  }

  create(uri: string, representation: any) : Promise<string | undefined> {
    return this.authHandler
      .post(uri, JSON.stringify(representation))
      .then(validateStatus)
      .then(createdOrUndefined);
  }

  update(uri: string, representation: any) : Promise<void> {
    return this.authHandler
      .post(uri, JSON.stringify(representation))
      .then(validateStatus)
      .then(() => Promise.resolve());
  }
}