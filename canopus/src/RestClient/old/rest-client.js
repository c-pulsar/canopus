// function makeRestClient(httpClient, options) {
//   const authHandler = makeHttpAuthHandler(httpClient, options);
//   const get = (uri) => authHandler
//     .get(uri)
//     .then(validateStatus)
//     .then(validateBody)
//     .then(makeRepresentation);

//   const getFeedItems = (feed) => Promise.all(feed.items.map(item => get(item.uri)));

//   const expand = (resource, uri, name) => uri 
//      ? get(uri).then(child => { resource[name] = child; return resource })
//      : Promise.resolve(resource);

//   const find = (uri, searchCriteria) => authHandler
//     .post(uri, JSON.stringify(searchCriteria))
//     .then(makeRepresentation);

//   const findItems = (uri, searchCriteria) => find(uri, searchCriteria)
//     .then(feed => getFeedItems(feed)); 

//   const create = (createFormUri, bodyContent) => get(createFormUri)
//     .then(createForm => authHandler
//     .post(createForm.createResourceUri, JSON.stringify(bodyContent)))
//     .then(parseJsonResponse);

//   return { get, getFeedItems, find, findItems, create, expand };
// }