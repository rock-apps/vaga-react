import { Response } from 'express';

declare module 'express-serve-static-core' {
  export interface Response {
    jsonOk: ResponseHandle;
    jsonBadRequest: ResponseHandle;
    jsonUnauthorized: ResponseHandle;
    jsonNotFound: ResponseHandle;
    jsonServerError: ResponseHandle;
  }
}

export type ResponseHandle = (data?: object) => Response;
