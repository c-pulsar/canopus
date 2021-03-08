import { HttpClient } from "./Http/HttpClient";
import { HttpMethod, HttpRequest } from "./Http/HttpRequest";
import { HttpResponse } from "./Http/HttpResponse";

export class FetchHttpClient implements HttpClient {

  makeRequest(method: HttpMethod, headers: any, body: any): HttpRequest {
    var request = { method, headers: {}, body } as any;
    headers.forEach((x:any) => request.headers[x.key] = x.value);
    return request;
  }

  makeHttpResponse(requestUri: string, requestVerb: HttpMethod, response: Response): Promise<HttpResponse> {
    return response.text().then(responseText => ({
       requestVerb: requestVerb,
       requestUri: requestUri,
       status: response.status,
       bodyText: responseText,
       headers: Array.from(response.headers).map((x:any) => ({ key: x[0], value: x[1] }))
    }));
  }

  get(uri: string, requestHeaders: any): Promise<HttpResponse> {
    return fetch(uri, this.makeRequest("GET", requestHeaders, undefined))
      .then(response => this.makeHttpResponse(uri, 'GET', response));
  }

  post(uri: string, body: any, requestHeaders: any): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }

}



// export function FetchHttpClient() {

//   function makeHttpResponse(requestUri, requestVerb, response) {
//     return response.text().then(responseText => ({
//         requestVerb: requestVerb,
//         requestUri: requestUri,
//         status: response.status,
//         bodyText: responseText,
//         headers: Array.from(response.headers).map(x => ({ key: x[0], value: x[1] }))       
//     }));
//   }

//   function makeRequest(method, headers, body) {   
//     var request = { method, headers: {}, body };
//     headers.forEach(x => request.headers[x.key] = x.value);    
//     return request; 
//   }

//   return { 
//     get: (uri, requestHeaders) => 
//       fetch(uri, makeRequest('GET', requestHeaders, undefined))
//         .then(response => makeHttpResponse(uri, 'GET', response)),

//     post: (uri, body, requestHeaders) => 
//       fetch(uri, makeRequest('POST', requestHeaders, body))
//         .then(response => makeHttpResponse(uri, 'POST', response))
//   }
// }