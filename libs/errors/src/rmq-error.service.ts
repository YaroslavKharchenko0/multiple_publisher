export class RmqErrorService extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'RmqErrorService';
    this.statusCode = statusCode;
  }

  notFound() {
    throw new RmqErrorService('Not found', 404);
  }

  forbidden() {
    throw new RmqErrorService('Forbidden', 403);
  }

  unauthorized() {
    throw new RmqErrorService('Unauthorized', 401);
  }

  badRequest() {
    throw new RmqErrorService('Bad request', 400);
  }

  internalServerError() {
    throw new RmqErrorService('Internal server error', 500);
  }

  customError(message: string, statusCode: number) {
    throw new RmqErrorService(message, statusCode);
  }
}
