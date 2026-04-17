import type { LineItem } from '../types';

export function rowAmount(item: LineItem): number {
  const q = Number(item.quantity) || 0;
  const p = Number(item.price) || 0;
  return Math.round(q * p * 100) / 100;
}

export function totalAmount(items: LineItem[]): number {
  const sum = items.reduce((acc, it) => acc + rowAmount(it), 0);
  return Math.round(sum * 100) / 100;
}
