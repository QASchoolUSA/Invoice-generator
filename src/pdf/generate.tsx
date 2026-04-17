import { pdf } from '@react-pdf/renderer';
import type { Invoice } from '../types';
import { sanitizeFilename } from '../utils/format';
import { InvoicePDF } from './InvoicePDF';

export async function downloadInvoice(data: Invoice): Promise<void> {
  const blob = await pdf(<InvoicePDF data={data} />).toBlob();
  const url = URL.createObjectURL(blob);

  const filename = `${sanitizeFilename(data.company.name)}-Invoice-${sanitizeFilename(
    data.invoiceNumber || 'draft',
  )}.pdf`;

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
