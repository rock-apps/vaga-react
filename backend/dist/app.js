"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _jwt = _interopRequireDefault(require("./middlewares/jwt"));

var _response = _interopRequireDefault(require("./middlewares/response"));

var _product = _interopRequireDefault(require("./controllers/products/product"));

var _order = _interopRequireDefault(require("./controllers/order"));

var _user = _interopRequireDefault(require("./controllers/user"));

var App = /*#__PURE__*/function () {
  function App() {
    (0, _classCallCheck2.default)(this, App);
    this.app = (0, _express.default)();
    this.middlewares();
    this.routes();
  }

  (0, _createClass2.default)(App, [{
    key: "middlewares",
    value: function middlewares() {
      var app = this.app;
      app.use((0, _cors.default)());
      app.use(_express.default.json());
      app.use(_response.default);
      app.use(_jwt.default);
    }
  }, {
    key: "routes",
    value: function routes() {
      var app = this.app;
      app.get('/product', _product.default.index);
      app.get('/product/:filter', _product.default.item);
      app.post('/product/rate', _product.default.rating);
      app.get('/product/comments/:product_id', _product.default.comments);
      app.post('/order/create', _order.default.create);
      app.get('/user/:id', _user.default.index);
      app.put('/user/update', _user.default.update);
      app.post('/user/sign-in', _user.default.login);
      app.post('/user/sign-up', _user.default.create);
      app.delete('/user/delete', _user.default.remove);
      app.post('/refresh', _user.default.refresh);
    }
  }]);
  return App;
}();

var _default = new App().app;
exports.default = _default;