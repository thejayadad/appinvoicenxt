// /lib/types/invoice.ts
export type InvoiceStatus = "Draft" | "Sent" | "Paid" | "Overdue";

export type Party = {
  name: string;
  email?: string;
  address?: string;
  phone?: string;
};

export type InvoiceItem = {
  id: string;
  description: string;
  rate: number;
  qty: number;
};

export type InvoiceData = {
  id: string;
  title: string;
  logoUrl?: string;
  from: Party;
  billTo: Party;
  number: string;
  date: string;
  status: InvoiceStatus; // 👈 this ensures consistency
  items: InvoiceItem[];
  taxPercent: number;
  currency: string;
  notes: string;
  brand: { name: string };
};
