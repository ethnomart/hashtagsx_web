export const SHIPPING_FEE = 250;
export const FREE_SHIPPING_THRESHOLD = 10000;

export const formatPrice = (n: number): string =>
  'Rs ' + Math.round(n).toLocaleString('en-PK');
