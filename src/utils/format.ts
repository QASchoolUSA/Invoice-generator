const currencyFmt = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function formatCurrency(n: number): string {
  if (!Number.isFinite(n)) return '$ 0';
  const rounded = Math.round(n * 100) / 100;
  const isInt = Number.isInteger(rounded);
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: isInt ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(rounded);
  return formatted.replace('$', '$ ');
}

export function formatCurrencyAccent(n: number): string {
  return formatCurrency(n);
}

export function formatUnit(n: number): string {
  if (!Number.isFinite(n)) return '0';
  const rounded = Math.round(n * 100) / 100;
  return Number.isInteger(rounded)
    ? rounded.toString()
    : rounded.toFixed(2);
}

export function formatDateUS(iso: string): string {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  const mm = String(m).padStart(2, '0');
  const dd = String(d).padStart(2, '0');
  return `${mm}/${dd}/${y}`;
}

export function sanitizeFilename(s: string): string {
  return (
    (s || 'Invoice')
      .trim()
      .replace(/[^a-zA-Z0-9._-]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 120) || 'Invoice'
  );
}

export { currencyFmt };
