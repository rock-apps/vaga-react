"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPage;

var isValidQuery = function isValidQuery(value) {
  return typeof value === 'string' && isFinite(parseInt(value));
};

function getPagination(page, offset) {
  var itemsForPage = Number(offset);
  var selectedPage = Number(page);
  var from = Number(selectedPage) * itemsForPage - itemsForPage;
  var to = Number(selectedPage) * itemsForPage;
  return {
    itemsForPage,
    from,
    to
  };
}

function getPage(page, offset, products) {
  var _getPagination = getPagination(page, offset),
      itemsForPage = _getPagination.itemsForPage,
      from = _getPagination.from,
      to = _getPagination.to;

  if (isValidQuery(page) && isValidQuery(offset)) {
    var TOTAL_PAGES = Math.round(products.length / itemsForPage);
    return {
      products: products.slice(from, to),
      pages: TOTAL_PAGES
    };
  }

  return {
    products
  };
}