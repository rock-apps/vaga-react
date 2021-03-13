"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _products = _interopRequireDefault(require("../../products.json"));

var _connection = _interopRequireDefault(require("../../database/connection"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Filter = /*#__PURE__*/function () {
  function Filter() {
    (0, _classCallCheck2.default)(this, Filter);
  }

  (0, _createClass2.default)(Filter, [{
    key: "id",
    value: function () {
      var _id = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(product_id) {
        var _avg$avgRate;

        var productId, _yield$db$where$avg, _yield$db$where$avg2, avg;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                productId = Number(product_id) - 1;
                _context.next = 3;
                return (0, _connection.default)('rating').where('rating.product_id', '=', product_id).avg('rate');

              case 3:
                _yield$db$where$avg = _context.sent;
                _yield$db$where$avg2 = (0, _slicedToArray2.default)(_yield$db$where$avg, 1);
                avg = _yield$db$where$avg2[0];
                return _context.abrupt("return", {
                  product: _objectSpread(_objectSpread({}, _products.default.products[productId]), {}, {
                    rating: (_avg$avgRate = avg['avg(`rate`)']) !== null && _avg$avgRate !== void 0 ? _avg$avgRate : 0
                  })
                });

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function id(_x) {
        return _id.apply(this, arguments);
      }

      return id;
    }()
  }, {
    key: "name",
    value: function name(product_name) {
      return {
        products: _products.default.products.filter(function (_ref) {
          var title = _ref.title;
          return ~title.indexOf(product_name);
        })
      };
    }
  }, {
    key: "category",
    value: function category(product_category) {
      var id = _products.default.categories.indexOf(product_category);

      var categoryId = id >= 0 ? id : Number(product_category);
      return {
        products: _products.default.products.filter(function (prod) {
          return prod.categoryId === categoryId;
        }),
        name: _products.default.categories[categoryId],
        description: _products.default.categoriesDescriptions[categoryId]
      };
    }
  }, {
    key: "categories",
    value: function categories() {
      return {
        categories: _products.default.categories
      };
    }
  }]);
  return Filter;
}();

var _default = new Filter();

exports.default = _default;