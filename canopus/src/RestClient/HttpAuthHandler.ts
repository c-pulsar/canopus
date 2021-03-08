import { HttpClient, HttpHeader, HttpResponse } from "./HttpClient";

export interface AuthOptions {
  bearerToken: string,
  onAuthFailed: (options: AuthOptions) => Promise<boolean>
}

export class HttpAuthHandler {

  constructor(private httpClient: HttpClient, private options: AuthOptions) {
  }

  private makeAuthorizationHeader(options: AuthOptions): HttpHeader | undefined {
    return options && options.bearerToken
      ? { key: 'Authorization', value: `Bearer ${options.bearerToken}` }
      : undefined;
  }

  private makeDefaultGetHttpHeaders(options: AuthOptions): HttpHeader[] {
    const headers = [{ key: 'Accept', value: 'application/json' }]
    const authHeader = this.makeAuthorizationHeader(options);
    if (authHeader) {
      headers.push(authHeader);
    }
    return headers
  }

  private makeDefaultPostHttpHeaders(options: AuthOptions): HttpHeader[] {
    const headers = [{ key: 'Content-Type', value: 'application/json' }]
    const authHeader = this.makeAuthorizationHeader(options);
    if (authHeader) {
      headers.push(authHeader);
    }
    return headers
  }

  private handleAndRetry(makeRequest: () => Promise<HttpResponse>): Promise<HttpResponse> {
    return makeRequest().then(response =>
      response.status === 401 && this.options && this.options.onAuthFailed
        ? this.options
          .onAuthFailed(this.options)
          .then(retry => (retry ? makeRequest() : Promise.resolve(response)))
        : Promise.resolve(response)
    );
  }

  get(uri: string): Promise<HttpResponse> {
    return this.handleAndRetry(() =>
      this.httpClient.get(uri, this.makeDefaultGetHttpHeaders(this.options)));
  }

  post(uri: string, body: string): Promise<HttpResponse> {
    return this.handleAndRetry(() =>
      this.httpClient.post(uri, body, this.makeDefaultPostHttpHeaders(this.options)));
  }
};