"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var TYPE_JSON = 'application/json';
var STATUS_CODE_OK = 200;
var STATUS_CODE_BAD_REQUEST = 400;
var STATUS_CODE_UNAUTHORIZED = 401;
var STATUS_CODE_NOT_FOUND = 404;
var STATUS_CODE_SERVER_ERROR = 500;

var jsonOk = function jsonOk(data) {
  var status = STATUS_CODE_OK;
  data = data || {};
  this.status(status);
  this.type(TYPE_JSON);
  return this.json(_objectSpread(_objectSpread({}, data), {}, {
    status
  }));
};

var jsonBadRequest = function jsonBadRequest(data) {
  var status = STATUS_CODE_BAD_REQUEST;
  data = data || {};
  this.status(status);
  this.type(TYPE_JSON);
  return this.json(_objectSpread(_objectSpread({}, data), {}, {
    status
  }));
};

var jsonUnauthorized = function jsonUnauthorized(data) {
  var status = STATUS_CODE_UNAUTHORIZED;
  data = data || {};
  this.status(status);
  this.type(TYPE_JSON);
  return this.json(_objectSpread(_objectSpread({}, data), {}, {
    status
  }));
};

var jsonNotFound = function jsonNotFound(data) {
  var status = STATUS_CODE_NOT_FOUND;
  data = data || {};
  this.status(status);
  this.type(TYPE_JSON);
  return this.json(_objectSpread(_objectSpread({
    message: 'request not found'
  }, data), {}, {
    status
  }));
};

var jsonServerError = function jsonServerError(data) {
  var status = STATUS_CODE_SERVER_ERROR;
  data = data || {};
  this.status(status);
  this.type(TYPE_JSON);
  return this.json(_objectSpread(_objectSpread({}, data), {}, {
    status
  }));
};

var response = function response(req, res, next) {
  res.jsonOk = jsonOk;
  res.jsonBadRequest = jsonBadRequest;
  res.jsonUnauthorized = jsonUnauthorized;
  res.jsonNotFound = jsonNotFound;
  res.jsonServerError = jsonServerError;
  next();
};

var _default = response;
exports.default = _default;