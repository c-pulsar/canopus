export interface HttpRequest {
  method: HttpMethod,
  headers: any,
  body: any
}

export type HttpMethod = "GET" | "POST";