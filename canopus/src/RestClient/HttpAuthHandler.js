export function HttpAuthHandler(httpClient, options) {

  const makeAuthorizationHeader = (options) => options.auth && options.auth.bearerToken
    ? {
        key: 'Authorization',
        value: `Bearer ${options.auth.bearerToken}`,
      }
    : undefined;

  const makeDefaultGetHttpHeaders = function (options) {
    const headers = [{ key: 'Accept', value: 'application/json' }]
    const authHeader = makeAuthorizationHeader(options);
    if (authHeader) {
      headers.push(authHeader);
    }
    return headers
  }

  const makeDefaultPostHttpHeaders = function (options) {
    const headers = [{ key: 'Content-Type', value: 'application/json' }]
    const authHeader = makeAuthorizationHeader(options);
    if (authHeader) {
      headers.push(authHeader); 
    }
    return headers
  } 

  const handleAndRetry = makeRequest =>
    makeRequest().then(response =>
      response.status === 401 && options.auth && options.auth.onAuthFailed
        ? options.auth
            .onAuthFailed(options.auth)
            .then(retry => (retry ? makeRequest() : Promise.resolve(response)))
        : Promise.resolve(response)
    )

  return { 
    get: uri =>
      handleAndRetry(() => httpClient.get(uri, makeDefaultGetHttpHeaders(options))),

    post: (uri, body) =>
      handleAndRetry(() => httpClient.post(uri, body, makeDefaultPostHttpHeaders(options))),
  }
}
