export const API_ROUTE = 'http://localhost:3001';

export const MESSAGES_ENDPOINT = `${API_ROUTE}/messages`;
// Other endpoints

export const getRequestOptions = (requestType = 'GET', bodyParams = {}) => {
  const bodyAllowed = ['POST', 'PUT'];

  return {
    method: requestType,
    headers: { 'Content-Type': 'application/json' },
    body: bodyAllowed.includes(requestType) &&  Object.keys(bodyParams).length > 0 ? JSON.stringify(bodyParams) : undefined
  }
}