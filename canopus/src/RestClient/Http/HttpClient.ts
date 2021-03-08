import { HttpResponse } from "./HttpResponse";

export interface HttpClient {
  get(uri: string, requestHeaders: any): Promise<HttpResponse>;
  post(uri: string, body: any, requestHeaders: any): Promise<HttpResponse>;
}