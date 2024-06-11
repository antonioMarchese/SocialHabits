export function Percentage(amount: number, completed: number) {
  return amount === 0 ? 0 : Math.round((completed / amount) * 100);
}
