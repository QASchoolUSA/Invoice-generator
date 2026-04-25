import { StyleSheet } from '@react-pdf/renderer';

export const ACCENT = '#4a7c85';
export const ACCENT_SOFT = '#dde9eb';
export const ACCENT_TINT = '#f3f7f8';
export const INK = '#1f2937';
export const INK_SOFT = '#4b5563';
export const INK_MUTED = '#6b7280';

export const styles = StyleSheet.create({
  page: {
    paddingTop: 54,
    paddingBottom: 54,
    paddingHorizontal: 54,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: INK,
    lineHeight: 1.35,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  companyBlock: {
    width: '58%',
  },
  companyName: {
    fontFamily: 'Times-Bold',
    fontSize: 20,
    color: ACCENT,
    letterSpacing: 0.6,
    marginBottom: 6,
  },
  companyLine: {
    fontSize: 10,
    color: INK_SOFT,
    marginBottom: 1.5,
  },
  headerRight: {
    width: '40%',
    alignItems: 'flex-end',
  },
  invoiceTitle: {
    fontFamily: 'Times-Bold',
    fontSize: 22,
    color: ACCENT,
    letterSpacing: 2,
  },
  metaWrap: {
    marginTop: 26,
    alignItems: 'flex-end',
  },
  metaRow: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    letterSpacing: 0.8,
    color: INK,
    marginBottom: 2,
  },
  billToWrap: {
    marginTop: 42,
    width: '60%',
  },
  billToLabel: {
    fontSize: 10,
    color: INK_SOFT,
    marginBottom: 2,
  },
  billToLine: {
    fontSize: 10.5,
    color: INK,
    marginBottom: 1.5,
  },
  table: {
    marginTop: 36,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 0.8,
    borderBottomColor: ACCENT,
    paddingBottom: 5,
  },
  thBase: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    letterSpacing: 1.2,
    color: ACCENT,
    textTransform: 'uppercase',
  },
  thDescription: { flex: 1, textAlign: 'left', paddingLeft: 8 },
  thQty: { width: 70, textAlign: 'left' },
  thPrice: { width: 70, textAlign: 'left' },
  thAmount: { width: 80, textAlign: 'left' },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 0.4,
    borderBottomColor: ACCENT_SOFT,
    paddingVertical: 6,
    alignItems: 'center',
  },
  tdDescription: {
    flex: 1,
    fontSize: 10.5,
    color: INK,
    textAlign: 'left',
    paddingLeft: 8,
  },
  tdQty: { width: 70, fontSize: 10.5, color: INK, textAlign: 'left' },
  tdPrice: { width: 70, fontSize: 10.5, color: INK, textAlign: 'left' },
  tdAmount: { width: 80, fontSize: 10.5, color: INK, textAlign: 'left' },
  totalRow: {
    flexDirection: 'row',
    borderTopWidth: 0.8,
    borderTopColor: ACCENT,
    paddingTop: 8,
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  totalLabel: {
    fontFamily: 'Times-BoldItalic',
    fontSize: 11,
    letterSpacing: 1.2,
    color: ACCENT,
    width: 70,
    textAlign: 'left',
  },
  totalValue: {
    width: 80,
    fontSize: 11.5,
    fontFamily: 'Helvetica-Bold',
    color: ACCENT,
    textAlign: 'left',
  },
  payCard: {
    marginTop: 28,
    borderWidth: 0.7,
    borderColor: ACCENT_SOFT,
    borderRadius: 6,
    backgroundColor: ACCENT_TINT,
    flexDirection: 'row',
  },
  payCol: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  payDivider: {
    width: 0.7,
    backgroundColor: ACCENT_SOFT,
  },
  payHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  payIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: ACCENT,
    color: '#ffffff',
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
    paddingTop: 2,
    marginRight: 6,
  },
  payTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 8.5,
    letterSpacing: 1.6,
    color: ACCENT,
    textTransform: 'uppercase',
  },
  payRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  payLabel: {
    width: 56,
    fontFamily: 'Helvetica-Bold',
    fontSize: 8,
    letterSpacing: 1.2,
    color: INK_MUTED,
    textTransform: 'uppercase',
    paddingTop: 1,
  },
  payValue: {
    flex: 1,
    fontSize: 10.5,
    color: INK,
  },
  payValueStrong: {
    flex: 1,
    fontSize: 10.5,
    color: INK,
    fontFamily: 'Helvetica-Bold',
  },
  terms: {
    fontSize: 10,
    color: INK_SOFT,
    marginTop: 18,
  },
  termsAccent: {
    color: ACCENT,
    fontFamily: 'Helvetica-Bold',
  },
  thanks: {
    marginTop: 34,
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
    letterSpacing: 1.2,
    color: ACCENT,
  },
});
