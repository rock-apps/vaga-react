import { NextFunction, Request, Response } from 'express';
import { ResponseHandle } from '../response';

const STATUS_CODE_OK = 200;
const STATUS_CODE_BAD_REQUEST = 400;
const STATUS_CODE_UNAUTHORIZED = 401;
const STATUS_CODE_NOT_FOUND = 404;
const STATUS_CODE_SERVER_ERROR = 500;

const jsonOk: ResponseHandle = function (this: Response, data = {}) {
  const status = STATUS_CODE_OK;
  this.status(status);

  return this.json({ ...data, status });
};

const jsonBadRequest: ResponseHandle = function (this: Response, data = {}) {
  const status = STATUS_CODE_BAD_REQUEST;
  this.status(status);

  return this.json({ ...data, status });
};

const jsonUnauthorized: ResponseHandle = function (this: Response, data = {}) {
  const status = STATUS_CODE_UNAUTHORIZED;
  this.status(status);

  return this.json({ ...data, status });
};

const jsonNotFound: ResponseHandle = function (this: Response, data = {}) {
  const status = STATUS_CODE_NOT_FOUND;
  this.status(status);

  return this.json({ message: 'request not found', ...data, status });
};

const jsonServerError: ResponseHandle = function (this: Response, data = {}) {
  const status = STATUS_CODE_SERVER_ERROR;
  this.status(status);

  return this.json({ ...data, status });
};

const response = (req: Request, res: Response, next: NextFunction) => {
  res.jsonOk = jsonOk;
  res.jsonBadRequest = jsonBadRequest;
  res.jsonUnauthorized = jsonUnauthorized;
  res.jsonNotFound = jsonNotFound;
  res.jsonServerError = jsonServerError;

  next();
};

export default response;
