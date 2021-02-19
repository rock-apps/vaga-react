const isValidQuery = (value: any) =>
  typeof value === 'string' && isFinite(parseInt(value));

function getPagination(page: any, offset: any) {
  const itemsForPage = Number(offset);
  const selectedPage = Number(page);

  const from = Number(selectedPage) * itemsForPage - itemsForPage;
  const to = Number(selectedPage) * itemsForPage;

  return {
    itemsForPage,
    from,
    to,
  };
}

export default function getPage(page: any, offset: any, products: any[]) {
  const { itemsForPage, from, to } = getPagination(page, offset);

  if (isValidQuery(page) && isValidQuery(offset)) {
    const TOTAL_PAGES = Math.round(products.length / itemsForPage);
    return {
      products: products.slice(from, to),
      pages: TOTAL_PAGES,
    };
  }

  return {
    products,
  };
}
