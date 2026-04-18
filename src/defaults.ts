import type { Invoice, LineItem } from './types';

export function newLineItem(): LineItem {
  return {
    id:
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `li_${Math.random().toString(36).slice(2, 10)}`,
    description: '',
    quantity: 1,
    price: 0,
  };
}

export function todayISO(): string {
  const d = new Date();
  const tz = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tz).toISOString().slice(0, 10);
}

export function makeDefaultInvoice(): Invoice {
  return {
    company: {
      name: 'Compass West LLC',
      address1: '1660 Retreat View Cir',
      address2: 'Sanford, FL 32771',
      phone: '+1 (407) 885-3831',
    },
    invoiceNumber: '06107',
    date: todayISO(),
    billTo: {
      name: 'Fleet Pro',
      address: '265 N Ivey Lane, Orlando, FL 32811',
      phone: '+1 (786) 202-7578',
    },
    itemDescriptionColumnLabel: 'Filter Name',
    items: [newLineItem()],
    bank: {
      name: 'Chase bank',
      routing: '650722637',
      account: '267084131',
      zelle: '+1 (407) 885-3831',
    },
    terms: { dueDays: 15, lateFeePercent: 1 },
    thanks: 'THANKS FOR YOUR BUSINESS!',
  };
}
