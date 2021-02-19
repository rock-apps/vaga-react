export const isValidQuery = (value: any) =>
  typeof value === 'string' && isFinite(parseInt(value));
