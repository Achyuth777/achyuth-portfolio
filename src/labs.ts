export function runway(stock: number, daily: number, delay: number) {
  return {
    days: stock / daily,
    shortfall: Math.max(0, Math.ceil(daily * delay - stock)),
  };
}
export function health(
  collateral: number,
  debt: number,
  shock: number,
  repayment = 0,
) {
  const remaining = debt - repayment;
  return remaining <= 0
    ? Infinity
    : (collateral * (1 - shock / 100) * 0.8) / remaining;
}
export function approvals(amount: number) {
  return amount > 5000 ? 2 : 1;
}
export function canSettle(amount: number, approved: number) {
  return amount > 0 && amount <= 25000 && approved >= approvals(amount);
}
