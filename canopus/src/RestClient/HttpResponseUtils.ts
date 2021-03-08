import { HttpMethod, HttpResponse } from "./HttpClient";

export class HttpResponseError extends Error {
  constructor(
    public responseStatus: number,
    public requestUri: string,
    public requestVerb: HttpMethod) {

    super(HttpResponseError.MakeFriendlyMessage(responseStatus, requestUri, requestVerb));
  }

  private static MakeFriendlyMessage(
    responseStatus: number,
    requestUri: string,
    requestVerb: HttpMethod): string {
    return `${requestVerb} '${requestUri}' returned status code: ${responseStatus}`;
  }
}

export function validateStatus(response: HttpResponse): HttpResponse {
  if (response.status < 400) {
    return response;
  }

  throw new HttpResponseError(response.status, response.requestUri, response.requestVerb);
}

export function validateBody(response: HttpResponse): HttpResponse {
  if (!response.bodyText || response.bodyText.trim().length === 0) {
    throw new Error(`${response.requestVerb} '${response.requestUri}' response doesnt have any content`);
  }

  return response;
}

export function makeRepresentation(response: HttpResponse) {
  const representation = parseJsonResponse(response);
  if (!representation._links) {
    throw new Error(`${response.requestVerb} '${response.requestUri}' response has no links`);
  }

  return representation;
}

function parseJsonResponse(response: HttpResponse): any {
  try {
    return JSON.parse(response.bodyText);
  } catch {
    throw new Error(`${response.requestVerb} '${response.requestUri}' response json could not be parsed`);
  }
}