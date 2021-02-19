export const isValidQuery = (value: any) =>
  typeof value === 'string' && isFinite(parseInt(value));

export function getPagination(page: any, offset: any) {
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

export default function getPage({ itemsForPage, from, to }, products: any[]) {
  const TOTAL_PAGES = Math.round(products.length / itemsForPage);
  return {
    products: products.slice(from, to),
    pages: TOTAL_PAGES,
  };
}
