"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _connection = _interopRequireDefault(require("../database/connection"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var checkLogin = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_ref) {
    var email, password, _yield$db$select$wher, _yield$db$select$wher2, account, ERROR_MESSAGE, dbPassword, rest, match;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            email = _ref.email, password = _ref.password;
            _context.next = 3;
            return (0, _connection.default)('users').select('name', 'avatar', 'id', 'password').where('users.email', '=', email);

          case 3:
            _yield$db$select$wher = _context.sent;
            _yield$db$select$wher2 = (0, _slicedToArray2.default)(_yield$db$select$wher, 1);
            account = _yield$db$select$wher2[0];
            ERROR_MESSAGE = 'Senha ou e-mail incorretos';

            if (account) {
              _context.next = 9;
              break;
            }

            throw ERROR_MESSAGE;

          case 9:
            dbPassword = account.password, rest = (0, _objectWithoutProperties2.default)(account, ["password"]);
            match = _bcrypt.default.compareSync(password, dbPassword);

            if (match) {
              _context.next = 13;
              break;
            }

            throw ERROR_MESSAGE;

          case 13:
            return _context.abrupt("return", rest);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function checkLogin(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = checkLogin;
exports.default = _default;