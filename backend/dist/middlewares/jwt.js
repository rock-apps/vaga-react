"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _jwt = require("../utils/jwt");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var EXCLUDED_PATHS = ['/product', '/products/:filter', '/refresh', '/user/sign-in', '/user/sign-up'];

var checkJwt = function checkJwt(req, res, next) {
  var path = req.url;
  var isExcluded = !!EXCLUDED_PATHS.find(function (p) {
    return path.includes(p);
  });
  if (isExcluded) return next();
  var token = (0, _jwt.getTokenFromHeaders)(req.headers);
  if (!token) return res.jsonUnauthorized();

  try {
    var decoded = (0, _jwt.verifyJwt)(token);
    res.locals = _objectSpread(_objectSpread({}, res.locals), {}, {
      session: decoded.id
    });
    next();
  } catch (err) {
    res.jsonUnauthorized();
  }
};

var _default = checkJwt;
exports.default = _default;