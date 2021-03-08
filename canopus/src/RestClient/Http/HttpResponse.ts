import { HttpMethod } from "./HttpRequest";

export interface HttpResponse {
  requestVerb: HttpMethod,
  requestUri: string,
  headers: any,
  status: number,
  bodyText: string
}