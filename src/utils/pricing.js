export const TAX_RATE = 0.08; // 8 % sales tax
export const DELIVERY_FEE = 2.99;
export const FREE_DELIVERY_MIN = 25; // orders at or above this subtotal ship free

const round2 = (n) => Math.round(n * 100) / 100;

/**
 * Work out the order totals from a list of cart lines.
 * @param {{price: number, qty: number}[]} lines
 */
export function calcTotals(lines) {
  const subtotal = round2(lines.reduce((sum, line) => sum + line.price * line.qty, 0));
  const tax = round2(subtotal * TAX_RATE);
  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_MIN ? 0 : DELIVERY_FEE;
  const total = round2(subtotal + tax + delivery);
  return { subtotal, tax, delivery, total };
}
