import { HttpMethod, HttpResponse } from "./HttpClient";
import { Representation } from "./Representation";

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

export function createdOrUndefined(response: HttpResponse): string | undefined {
  if (response.status === 201) {
    const location = response.headers.find(x => x.key.toLowerCase() === "location");
    if (location) {
      return location.value;
    }
  }

  return undefined;
}

export function validateBody(response: HttpResponse): HttpResponse {
  if (!response.bodyText || response.bodyText.trim().length === 0) {
    throw new Error(`${response.requestVerb} '${response.requestUri}' response doesnt have any content`);
  }

  return response;
}

export function makeRepresentation(response: HttpResponse): Representation {
  const representation = parseJsonResponse(response);
  if (!representation._links) {
    throw new Error(`${response.requestVerb} '${response.requestUri}' response representation has no links`);
  }

  if (!representation._type) {
    throw new Error(`${response.requestVerb} '${response.requestUri}' response representation has no type`);
  }

  return representation;
}

export function makeAny(response: HttpResponse): any {
  return parseJsonResponse(response);
}

function parseJsonResponse(response: HttpResponse): any {
  try {
    return JSON.parse(response.bodyText);
  } catch {
    throw new Error(`${response.requestVerb} '${response.requestUri}' response json could not be parsed`);
  }
}