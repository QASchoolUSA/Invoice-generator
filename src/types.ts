export type LineItem = {
  id: string;
  description: string;
  quantity: number;
  price: number;
};

export type Company = {
  name: string;
  address1: string;
  address2: string;
  phone: string;
};

export type BillTo = {
  name: string;
  address: string;
  phone: string;
};

export type Bank = {
  name: string;
  routing: string;
  account: string;
  zelle: string;
};

export type Terms = {
  dueDays: number;
  lateFeePercent: number;
};

export type Invoice = {
  company: Company;
  invoiceNumber: string;
  date: string;
  billTo: BillTo;
  /** First column header for line items (e.g. Description, Filter Name). */
  itemDescriptionColumnLabel: string;
  items: LineItem[];
  bank: Bank;
  terms: Terms;
  thanks: string;
};
