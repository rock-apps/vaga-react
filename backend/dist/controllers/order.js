"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _connection = _interopRequireDefault(require("../database/connection"));

var Order = /*#__PURE__*/function () {
  function Order() {
    (0, _classCallCheck2.default)(this, Order);
  }

  (0, _createClass2.default)(Order, [{
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
        var _req$body, id, products, _yield$db$select$wher, _yield$db$select$wher2, account;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, id = _req$body.id, products = _req$body.products;
                _context.next = 3;
                return (0, _connection.default)('users').select('*').where('users.id', '=', id);

              case 3:
                _yield$db$select$wher = _context.sent;
                _yield$db$select$wher2 = (0, _slicedToArray2.default)(_yield$db$select$wher, 1);
                account = _yield$db$select$wher2[0];

                if (account) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", res.jsonBadRequest({
                  message: 'Ocorreu um erro ao criar seu pedido, recarregue a página ou entre mais tarde.'
                }));

              case 8:
                return _context.abrupt("return", res.jsonOk({
                  account,
                  products
                }));

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function create(_x, _x2) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }]);
  return Order;
}();

var _default = new Order();

exports.default = _default;