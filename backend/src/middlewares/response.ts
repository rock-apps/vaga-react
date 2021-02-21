import { NextFunction, Request, Response } from 'express';

const TYPE_JSON = 'aplication/json';
const STATUS_CODE_OK = 200;
const STATUS_CODE_BAD_REQUEST = 400;
const STATUS_CODE_UNAUTHORIZED = 401;
const STATUS_CODE_NOT_FOUND = 404;
const STATUS_CODE_SERVER_ERROR = 500;

type ResponseHandle = (data: object, message: string) => Response;

const jsonOk: ResponseHandle = function (data, message) {
  message = message || '';

  this.status(STATUS_CODE_OK);
  this.type(TYPE_JSON);

  return this.json({ message, data, status });
};

const jsonBadRequest: ResponseHandle = function (data, message) {
  message = message || '';

  this.status(STATUS_CODE_BAD_REQUEST);
  this.type(TYPE_JSON);

  return this.json({ message, data, status });
};

const jsonUnauthorized: ResponseHandle = function (data, message) {
  message = message || '';

  this.status(STATUS_CODE_UNAUTHORIZED);
  this.type(TYPE_JSON);

  return this.json({ message, data, status });
};

const jsonNotFound: ResponseHandle = function (data, message) {
  message = message || 'request not found';

  this.status(STATUS_CODE_NOT_FOUND);
  this.type(TYPE_JSON);

  return this.json({ message, data, status });
};

const jsonServerError: ResponseHandle = function (data, message) {
  message = message || '';

  this.status(STATUS_CODE_SERVER_ERROR);
  this.type(TYPE_JSON);

  return this.json({ message, data, status });
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
