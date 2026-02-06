export abstract class ApiError extends Error {
  statusCode: any;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype); // TS fix for extending Error
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = "Resource not found") {
    super(message, 404);
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string = "Bad request") {
    super(message, 400);
  }
}
