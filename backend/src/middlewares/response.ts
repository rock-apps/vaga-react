import { NextFunction, Request, Response } from 'express';
import { ResponseHandle } from '../response';

const TYPE_JSON = 'application/json';
const STATUS_CODE_OK = 200;
const STATUS_CODE_BAD_REQUEST = 400;
const STATUS_CODE_UNAUTHORIZED = 401;
const STATUS_CODE_NOT_FOUND = 404;
const STATUS_CODE_SERVER_ERROR = 500;

const jsonOk: ResponseHandle = function (data) {
  const status = STATUS_CODE_OK;
  data = data || {};

  this.status(status);
  this.type(TYPE_JSON);

  return this.json({ ...data, status });
};

const jsonBadRequest: ResponseHandle = function (data) {
  const status = STATUS_CODE_BAD_REQUEST;
  data = data || {};

  this.status(status);
  this.type(TYPE_JSON);

  return this.json({ ...data, status });
};

const jsonUnauthorized: ResponseHandle = function (data) {
  const status = STATUS_CODE_UNAUTHORIZED;
  data = data || {};

  this.status(status);
  this.type(TYPE_JSON);

  return this.json({ ...data, status });
};

const jsonNotFound: ResponseHandle = function (data) {
  const status = STATUS_CODE_NOT_FOUND;
  data = data || {};

  this.status(status);
  this.type(TYPE_JSON);

  return this.json({ message: 'request not found', ...data, status });
};

const jsonServerError: ResponseHandle = function (data) {
  const status = STATUS_CODE_SERVER_ERROR;
  data = data || {};

  this.status(status);
  this.type(TYPE_JSON);

  return this.json({ ...data, status });
};

const response = (req: Request, res: any, next: NextFunction) => {
  res.jsonOk = jsonOk;
  res.jsonBadRequest = jsonBadRequest;
  res.jsonUnauthorized = jsonUnauthorized;
  res.jsonNotFound = jsonNotFound;
  res.jsonServerError = jsonServerError;

  next();
};

export default response;
