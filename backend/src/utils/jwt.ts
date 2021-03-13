require('dotenv').config();

import { IncomingHttpHeaders } from 'http';
import JWT from 'jsonwebtoken';

const tokenPrivateKey = String(process.env.JWT_TOKEN_PRIVATE_KEY);
const refreshTokenPrivateKey = String(process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY);

const options = { expiresIn: '30 minutes' };
const refreshOptions = { expiresIn: '30 days' };

export interface Payload {
  id: number;
  version?: number;
}

export interface Decoded {
  id: number;
  iat: number;
  exp: number;
  version: number;
}

export const generateJwt = (payload: Payload) =>
  JWT.sign(payload, tokenPrivateKey, options);
export const generateRefreshJwt = (payload: Payload) =>
  JWT.sign(payload, refreshTokenPrivateKey, refreshOptions);

export const verifyJwt = (token: string) => JWT.verify(token, tokenPrivateKey);
export const verifyRefreshJwt = (token: string) => JWT.verify(token, refreshTokenPrivateKey) as Decoded;

export const getTokenFromHeaders = (headers: IncomingHttpHeaders) => {
  const token = headers['authorization'];
  return token ? token.slice(7, token.length) : null;
}