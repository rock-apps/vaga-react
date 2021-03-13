"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.up = up;
exports.down = down;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function up(_x) {
  return _up.apply(this, arguments);
}

function _up() {
  _up = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(knex) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", knex.schema.createTable('rating', function (table) {
              table.increments('id').primary();
              table.integer('rate').notNullable();
              table.string('comment').notNullable();
              table.integer('product_id').notNullable();
              table.integer('user_id').notNullable();
              table.foreign('user_id').references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _up.apply(this, arguments);
}

function down(_x2) {
  return _down.apply(this, arguments);
}

function _down() {
  _down = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(knex) {
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", knex.schema.dropTable('rating'));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _down.apply(this, arguments);
}