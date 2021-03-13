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

var _filter = _interopRequireDefault(require("./filter"));

var _products = _interopRequireDefault(require("../../products.json"));

var _getPage = _interopRequireDefault(require("../../utils/getPage"));

var _connection = _interopRequireDefault(require("../../database/connection"));

var ITEMS_FOR_PAGE = 5;

var Product = /*#__PURE__*/function () {
  function Product() {
    (0, _classCallCheck2.default)(this, Product);
  }

  (0, _createClass2.default)(Product, [{
    key: "index",
    value: function index(req, res) {
      var _req$query = req.query,
          page = _req$query.page,
          offset = _req$query.offset;
      return res.jsonOk((0, _getPage.default)(page, offset, _products.default.products));
    }
  }, {
    key: "item",
    value: function () {
      var _item = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
        var query, params, filter, filterHandler;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = req.query, params = req.params;
                filter = params.filter;

                if (filter in _filter.default) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", res.jsonBadRequest({
                  message: 'Filtro inválido'
                }));

              case 4:
                _context.prev = 4;
                filterHandler = _filter.default[filter];
                _context.t0 = res;
                _context.next = 9;
                return filterHandler(query.value);

              case 9:
                _context.t1 = _context.sent;
                return _context.abrupt("return", _context.t0.jsonOk.call(_context.t0, _context.t1));

              case 13:
                _context.prev = 13;
                _context.t2 = _context["catch"](4);
                return _context.abrupt("return", res.jsonServerError());

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 13]]);
      }));

      function item(_x, _x2) {
        return _item.apply(this, arguments);
      }

      return item;
    }()
  }, {
    key: "rating",
    value: function () {
      var _rating = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(req, res) {
        var _req$body, rate, comment, product_id, user_id, _yield$db$insert, _yield$db$insert2, ratingId, _yield$db$where$join$, _yield$db$where$join$2, _comment;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _req$body = req.body, rate = _req$body.rate, comment = _req$body.comment, product_id = _req$body.product_id, user_id = _req$body.user_id;
                _context2.prev = 1;
                _context2.next = 4;
                return (0, _connection.default)('rating').insert({
                  rate,
                  comment,
                  user_id,
                  product_id
                });

              case 4:
                _yield$db$insert = _context2.sent;
                _yield$db$insert2 = (0, _slicedToArray2.default)(_yield$db$insert, 1);
                ratingId = _yield$db$insert2[0];

                if (ratingId) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt("return", res.jsonBadRequest({
                  message: 'Não foi possível criar um comentário'
                }));

              case 9:
                _context2.next = 11;
                return (0, _connection.default)('rating').where('rating.id', '=', ratingId).join('users', 'rating.user_id', '=', user_id).select('rating.*', 'users.name', 'users.avatar');

              case 11:
                _yield$db$where$join$ = _context2.sent;
                _yield$db$where$join$2 = (0, _slicedToArray2.default)(_yield$db$where$join$, 1);
                _comment = _yield$db$where$join$2[0];
                return _context2.abrupt("return", res.jsonOk({
                  comment: _comment
                }));

              case 17:
                _context2.prev = 17;
                _context2.t0 = _context2["catch"](1);
                return _context2.abrupt("return", res.jsonServerError());

              case 20:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 17]]);
      }));

      function rating(_x3, _x4) {
        return _rating.apply(this, arguments);
      }

      return rating;
    }()
  }, {
    key: "comments",
    value: function () {
      var _comments = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(req, res) {
        var product_id, _req$query$page, page, _comments2, _Number, _yield$db$where$count, _yield$db$where$count2, count, quantity, pages;

        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                product_id = req.params.product_id;
                _req$query$page = req.query.page, page = _req$query$page === void 0 ? 1 : _req$query$page;

                if (product_id) {
                  _context3.next = 4;
                  break;
                }

                return _context3.abrupt("return", res.jsonBadRequest({
                  message: 'Product id deve ser um valor válido!'
                }));

              case 4:
                _context3.prev = 4;
                _context3.next = 7;
                return (0, _connection.default)('rating').where('rating.product_id', '=', product_id).join('users', 'rating.user_id', '=', 'users.id').select('rating.*', 'users.name', 'users.avatar').limit(ITEMS_FOR_PAGE).offset((Number(page) - 1) * ITEMS_FOR_PAGE);

              case 7:
                _comments2 = _context3.sent;

                if (!(Number(page) == 1)) {
                  _context3.next = 17;
                  break;
                }

                _context3.next = 11;
                return (0, _connection.default)('rating').where('rating.product_id', '=', product_id).count();

              case 11:
                _yield$db$where$count = _context3.sent;
                _yield$db$where$count2 = (0, _slicedToArray2.default)(_yield$db$where$count, 1);
                count = _yield$db$where$count2[0];
                quantity = (_Number = Number(count['count(*)'])) !== null && _Number !== void 0 ? _Number : ITEMS_FOR_PAGE;
                pages = Math.ceil(quantity / ITEMS_FOR_PAGE);
                return _context3.abrupt("return", res.jsonOk({
                  comments: _comments2,
                  pages
                }));

              case 17:
                return _context3.abrupt("return", res.jsonOk({
                  comments: _comments2
                }));

              case 20:
                _context3.prev = 20;
                _context3.t0 = _context3["catch"](4);
                return _context3.abrupt("return", res.jsonServerError());

              case 23:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[4, 20]]);
      }));

      function comments(_x5, _x6) {
        return _comments.apply(this, arguments);
      }

      return comments;
    }()
  }]);
  return Product;
}();

var _default = new Product();

exports.default = _default;