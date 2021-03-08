export function FetchHttpClient() {

  function makeHttpResponse(requestUri, requestVerb, response) {
    return response.text().then(responseText => ({
        requestVerb: requestVerb,
        requestUri: requestUri,
        status: response.status,
        bodyText: responseText,
        headers: Array.from(response.headers).map(x => ({ key: x[0], value: x[1] }))       
    }));
  }

  function makeRequest(method, headers, body) {   
    var request = { method, headers: {}, body };
    headers.forEach(x => request.headers[x.key] = x.value);    
    return request; 
  }

  return { 
    get: (uri, requestHeaders) => 
      fetch(uri, makeRequest('GET', requestHeaders, undefined))
        .then(response => makeHttpResponse(uri, 'GET', response)),
     
    post: (uri, body, requestHeaders) => 
      fetch(uri, makeRequest('POST', requestHeaders, body))
        .then(response => makeHttpResponse(uri, 'POST', response))
  }
}