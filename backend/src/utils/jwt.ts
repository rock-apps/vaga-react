require('dotenv').config();

import JWT from 'jsonwebtoken';

const tokenPrivateKey = process.env.JWT_TOKEN_PRIVATE_KEY;
const refreshTokenPrivateKey = process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY;

const options = { expiresIn: '30 minutes' };
const refreshOptions = { expiresIn: '30 days' };

export interface Payload {
  id: number;
  version?: number;
}

export const generateJwt = (payload: Payload) =>
  JWT.sign(payload, tokenPrivateKey, options);
export const generateRefreshJwt = (payload: Payload) =>
  JWT.sign(payload, refreshTokenPrivateKey, refreshOptions);

export const getTokenFromHeaders = (headers: Headers) => {
  const token = headers['authorization'];
  return token ? token.slice(7, token.length) : null;
}