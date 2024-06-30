import { createErrorResponse } from '@app/contracts'

const notFoundError = createErrorResponse(404, 'Not Found');
const badRequestError = createErrorResponse(400, 'Bad Request');
const unauthorizedError = createErrorResponse(401, 'Unauthorized');
const forbiddenError = createErrorResponse(403, 'Forbidden');
const internalServerError = createErrorResponse(500, 'Internal Server Error');
const serviceUnavailableError = createErrorResponse(503, 'Service Unavailable');

export {
  notFoundError,
  badRequestError,
  unauthorizedError,
  forbiddenError,
  internalServerError,
  serviceUnavailableError
}
