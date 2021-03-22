import { HttpClient, HttpHeader, HttpMethod, HttpResponse } from "./HttpClient";

export class FetchHttpClient implements HttpClient {

  private makeRequest(method: HttpMethod, headers: HttpHeader[], body: string | undefined): RequestInit {
    var request = { method, headers: {}, body } as any;
    headers.forEach(x => request.headers[x.key] = x.value);
    return request;
  }

  private makeHttpResponse(
    requestUri: string, requestVerb: HttpMethod, response: Response): Promise<HttpResponse> {
    return response.text().then(responseText => ({
      requestVerb: requestVerb,
      requestUri: requestUri,
      status: response.status,
      bodyText: responseText,
      headers: Array.from(response.headers).map((x: any) => ({ key: x[0], value: x[1] }))
    }));
  }

  get(uri: string, requestHeaders: HttpHeader[]): Promise<HttpResponse> {
    return fetch(uri, this.makeRequest("GET", requestHeaders, undefined))
      .then(response => this.makeHttpResponse(uri, 'GET', response));
  }

  post(uri: string, body: string, requestHeaders: HttpHeader[]): Promise<HttpResponse> {
    return fetch(uri, this.makeRequest('POST', requestHeaders, body))
      .then(response => this.makeHttpResponse(uri, 'POST', response));
  }

  delete(uri: string, requestHeaders: HttpHeader[]): Promise<HttpResponse> {
    return fetch(uri, this.makeRequest('DELETE', requestHeaders, undefined))
      .then(response => this.makeHttpResponse(uri, 'DELETE', response));
  }
}