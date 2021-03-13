"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTokenFromHeaders = exports.verifyRefreshJwt = exports.verifyJwt = exports.generateRefreshJwt = exports.generateJwt = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

require('dotenv').config();

var tokenPrivateKey = String(process.env.JWT_TOKEN_PRIVATE_KEY);
var refreshTokenPrivateKey = String(process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY);
var options = {
  expiresIn: '30 minutes'
};
var refreshOptions = {
  expiresIn: '30 days'
};

var generateJwt = function generateJwt(payload) {
  return _jsonwebtoken.default.sign(payload, tokenPrivateKey, options);
};

exports.generateJwt = generateJwt;

var generateRefreshJwt = function generateRefreshJwt(payload) {
  return _jsonwebtoken.default.sign(payload, refreshTokenPrivateKey, refreshOptions);
};

exports.generateRefreshJwt = generateRefreshJwt;

var verifyJwt = function verifyJwt(token) {
  return _jsonwebtoken.default.verify(token, tokenPrivateKey);
};

exports.verifyJwt = verifyJwt;

var verifyRefreshJwt = function verifyRefreshJwt(token) {
  return _jsonwebtoken.default.verify(token, refreshTokenPrivateKey);
};

exports.verifyRefreshJwt = verifyRefreshJwt;

var getTokenFromHeaders = function getTokenFromHeaders(headers) {
  var token = headers['authorization'];
  return token ? token.slice(7, token.length) : null;
};

exports.getTokenFromHeaders = getTokenFromHeaders;