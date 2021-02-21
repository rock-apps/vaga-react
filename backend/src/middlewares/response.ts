import { NextFunction, Request } from "express";

const TYPE_JSON = 'aplication/json';
const STATUS_CODE_OK = 200;
const STATUS_CODE_BAD_REQUEST = 400;
const STATUS_CODE_UNAUTHORIZED = 401;
const STATUS_CODE_NOT_FOUND = 404;
const STATUS_CODE_SERVER_ERROR = 500;

const jsonOk = function (data: object, message: string, metadata: object) {
  const status = STATUS_CODE_OK;
  message = (message) ? message : '';
  metadata = metadata ? metadata : {};

  this.status(status);
  this.type(TYPE_JSON);

  return this.json({ message, data, metadata, status });
}

const response = (req: Request, res: any, next: NextFunction) => {
  res.jsonOk = jsonOk;


  next();
}

export default response;