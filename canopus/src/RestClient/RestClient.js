import { HttpAuthHandler } from './HttpAuthHandler';

export function RestClient(httpClient, options) {
  const authHandler = HttpAuthHandler(httpClient, options);

  // const get = (uri) => authHandler
  //   .get(uri)
  //   .then(validateStatus)
  //   .then(validateBody)
  //   .then(makeRepresentation);

  // return { get };

  return {};
}