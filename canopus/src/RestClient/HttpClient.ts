export interface HttpClient {
  get(uri: string, requestHeaders: HttpHeader[]): Promise<HttpResponse>;
  post(uri: string, body: string, requestHeaders: HttpHeader[]): Promise<HttpResponse>;
}

export type HttpMethod = "GET" | "POST";

export interface HttpHeader {
  key: string,
  value: string
}

export interface HttpResponse {
  requestVerb: HttpMethod,
  requestUri: string,
  headers: HttpHeader[],
  status: number,
  bodyText: string
}