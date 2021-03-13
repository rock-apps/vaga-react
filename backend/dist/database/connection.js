"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _knex = _interopRequireDefault(require("knex"));

var _path = _interopRequireDefault(require("path"));

var db = (0, _knex.default)({
  client: 'sqlite3',
  connection: {
    filename: _path.default.resolve(__dirname, 'database.sqlite')
  },
  useNullAsDefault: true
});
var _default = db;
exports.default = _default;