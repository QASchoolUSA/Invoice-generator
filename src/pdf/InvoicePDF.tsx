import { Document, Page, Text, View } from '@react-pdf/renderer';
import type { Invoice } from '../types';
import { rowAmount, totalAmount } from '../utils/calc';
import { formatCurrency, formatDateUS, formatUnit } from '../utils/format';
import { styles } from './pdfStyles';

type Props = { data: Invoice };

export function InvoicePDF({ data }: Props) {
  const total = totalAmount(data.items);

  return (
    <Document
      title={`Invoice ${data.invoiceNumber}`}
      author={data.company.name}
      subject={`Invoice ${data.invoiceNumber} for ${data.billTo.name}`}
    >
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.companyBlock}>
            <Text style={styles.companyName}>
              {(data.company.name || '').toUpperCase()}
            </Text>
            {!!data.company.address1 && (
              <Text style={styles.companyLine}>{data.company.address1}</Text>
            )}
            {!!data.company.address2 && (
              <Text style={styles.companyLine}>{data.company.address2}</Text>
            )}
            {!!data.company.phone && (
              <Text style={styles.companyLine}>{data.company.phone}</Text>
            )}
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <View style={styles.metaWrap}>
              <Text style={styles.metaRow}>
                INVOICE: {data.invoiceNumber || '—'}
              </Text>
              <Text style={styles.metaRow}>
                DATE: {formatDateUS(data.date)}
              </Text>
            </View>
          </View>
        </View>

        {/* Bill To */}
        <View style={styles.billToWrap}>
          <Text style={styles.billToLabel}>To:</Text>
          {!!data.billTo.name && (
            <Text style={styles.billToLine}>{data.billTo.name}</Text>
          )}
          {!!data.billTo.address &&
            data.billTo.address.split('\n').map((ln, i) => (
              <Text key={i} style={styles.billToLine}>
                {ln}
              </Text>
            ))}
          {!!data.billTo.phone && (
            <Text style={styles.billToLine}>{data.billTo.phone}</Text>
          )}
        </View>

        {/* Items table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.thBase, styles.thDescription]}>DESCRIPTION</Text>
            <Text style={[styles.thBase, styles.thQty]}>QUANTITY</Text>
            <Text style={[styles.thBase, styles.thPrice]}>PRICE</Text>
            <Text style={[styles.thBase, styles.thAmount]}>AMOUNT</Text>
          </View>

          {data.items.map((it) => (
            <View key={it.id} style={styles.row} wrap={false}>
              <Text style={styles.tdDescription}>{it.description || ' '}</Text>
              <Text style={styles.tdQty}>{formatUnit(it.quantity)}</Text>
              <Text style={styles.tdPrice}>{formatCurrency(it.price)}</Text>
              <Text style={styles.tdAmount}>{formatCurrency(rowAmount(it))}</Text>
            </View>
          ))}

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>TOTAL</Text>
            <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
          </View>
        </View>

        {/* Payment methods card */}
        <View style={styles.payCard} wrap={false}>
          <View style={styles.payCol}>
            <View style={styles.payHeader}>
              <Text style={styles.payIcon}>B</Text>
              <Text style={styles.payTitle}>BANK TRANSFER</Text>
            </View>
            <View style={styles.payRow}>
              <Text style={styles.payLabel}>Bank</Text>
              <Text style={styles.payValueStrong}>{data.bank.name || '—'}</Text>
            </View>
            <View style={styles.payRow}>
              <Text style={styles.payLabel}>Routing</Text>
              <Text style={styles.payValue}>{data.bank.routing || '—'}</Text>
            </View>
            <View style={styles.payRow}>
              <Text style={styles.payLabel}>Account</Text>
              <Text style={styles.payValue}>{data.bank.account || '—'}</Text>
            </View>
          </View>
          <View style={styles.payDivider} />
          <View style={styles.payCol}>
            <View style={styles.payHeader}>
              <Text style={styles.payIcon}>Z</Text>
              <Text style={styles.payTitle}>ZELLE</Text>
            </View>
            <View style={styles.payRow}>
              <Text style={styles.payLabel}>Send to</Text>
              <Text style={styles.payValueStrong}>{data.bank.zelle || '—'}</Text>
            </View>
          </View>
        </View>

        {/* Terms */}
        <Text style={styles.terms}>
          Total due in{' '}
          <Text style={styles.termsAccent}>{data.terms.dueDays}</Text> days.
          Overdue accounts subject to a service charge of{' '}
          <Text style={styles.termsAccent}>
            {formatUnit(data.terms.lateFeePercent)}%
          </Text>{' '}
          per month.
        </Text>

        {/* Thanks */}
        {!!data.thanks && (
          <Text style={styles.thanks}>
            {(data.thanks || '').toUpperCase()}
          </Text>
        )}
      </Page>
    </Document>
  );
}
