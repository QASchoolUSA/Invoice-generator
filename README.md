# Invoice Generator

A clean, fast, mobile-first invoice generator. Edit every field in place, tap **Generate Invoice**, and download a crisp, vector PDF.

Built with Vite + React 18 + TypeScript + Tailwind CSS + `@react-pdf/renderer`.

## Features

- WYSIWYG inline editing — the form IS the invoice.
- Works beautifully on desktop and mobile (sticky generate button, big tap targets, dedicated mobile card layout for line items).
- Line items with add/remove, auto-computed row amounts and total.
- Native date picker; currency auto-formatted.
- One-click PDF download — vector text, Letter-size, named `CompanyName-Invoice-Number.pdf`.
- Fully client-side. No data ever leaves your browser.
- PDF generator is lazy-loaded (only pulled in when you click Generate) to keep the initial load fast.

## Getting started

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Default values

All defaults (company, bill-to, bank, terms) live in [`src/defaults.ts`](src/defaults.ts) — edit that file to change what you see on first load.

## File map

```
src/
  App.tsx                 page layout, top bar, sticky mobile CTA
  defaults.ts             default Invoice + new line item factory
  types.ts                Invoice, LineItem, Company, BillTo, Bank, Terms
  components/
    InvoiceEditor.tsx     editable invoice
    EditableText.tsx      text + number inputs styled to look like plain text
    LineItemsTable.tsx    desktop grid + mobile cards
    GenerateButton.tsx    teal CTA with loading state
  pdf/
    InvoicePDF.tsx        @react-pdf/renderer document
    pdfStyles.ts          StyleSheet for the PDF
    generate.tsx          pdf() -> Blob -> download
  utils/
    format.ts             currency/date formatters + filename sanitizer
    calc.ts               row amount + total
```

## License

MIT
