class HttpResponseError extends Error {
   constructor(responseStatus, requestUri, requestVerb) {
     var message = `${requestVerb} '${requestUri}' returned status code: ${responseStatus}`;
     super(message); 

     this.responseStatus = responseStatus;
     this.requestUri = requestUri;
     this.requestVerb = requestVerb;
  }
}

function parseJsonResponse(response) {
	try {
		return JSON.parse(response.bodyText);
	} catch {
		throw new Error(`${response.requestVerb} '${response.requestUri}' response json could not be parsed`);
	}
}

function validateStatus(response) {
  if (response.status < 400) {
    return response;
  }

  throw new HttpResponseError(response.status, response.requestUri, response.requestVerb);
}

function validateBody(response) {
	if (!response.bodyText || response.bodyText.trim().length === 0) {
		throw new Error(`${response.requestVerb} '${response.requestUri}' response doesnt have any content`);
	}

	return response;
}

function makeRepresentation(response) {
	const representation = parseJsonResponse(response);
	if (!representation.uri) {
		throw new Error(`${response.requestVerb} '${response.requestUri}' response has no uri`);
	}

	return representation;
}