import { Landmark, Smartphone } from 'lucide-react';
import type { Invoice } from '../types';
import { EditableNumber, EditableText } from './EditableText';
import { LineItemsTable } from './LineItemsTable';

type Props = {
  data: Invoice;
  onChange: (next: Invoice) => void;
};

export function InvoiceEditor({ data, onChange }: Props) {
  const set = <K extends keyof Invoice>(key: K, value: Invoice[K]) =>
    onChange({ ...data, [key]: value });

  return (
    <section className="paper bg-white rounded-2xl sm:rounded-[18px] shadow-paper border border-slate-200/70 px-5 py-6 sm:px-12 sm:py-12 w-full">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
        <div className="w-full sm:max-w-[55%]">
          <EditableText
            value={data.company.name}
            onChange={(v) => set('company', { ...data.company, name: v })}
            placeholder="Company Name"
            ariaLabel="Company name"
            className="font-serif text-[22px] sm:text-[28px] leading-tight font-semibold text-teal-accent tracking-wide uppercase"
            autoCapitalize="characters"
            maxLength={60}
          />
          <div className="mt-3 space-y-0.5 text-[13px] sm:text-[14px] text-slate-700">
            <EditableText
              value={data.company.address1}
              onChange={(v) => set('company', { ...data.company, address1: v })}
              placeholder="Street address"
              ariaLabel="Company address line 1"
            />
            <EditableText
              value={data.company.address2}
              onChange={(v) => set('company', { ...data.company, address2: v })}
              placeholder="City, State ZIP"
              ariaLabel="Company address line 2"
            />
            <EditableText
              value={data.company.phone}
              onChange={(v) => set('company', { ...data.company, phone: v })}
              placeholder="Phone"
              ariaLabel="Company phone"
              inputMode="tel"
            />
          </div>
        </div>

        <div className="sm:text-right">
          <div className="font-serif text-[28px] sm:text-[34px] font-semibold tracking-[0.12em] text-teal-accent uppercase">
            Invoice
          </div>
          <div className="mt-6 sm:mt-10 space-y-1.5 text-[12px] sm:text-[13px] tracking-[0.08em] text-slate-800 font-semibold">
            <div className="flex sm:justify-end items-center gap-2">
              <span className="uppercase">Invoice:</span>
              <EditableText
                value={data.invoiceNumber}
                onChange={(v) => set('invoiceNumber', v)}
                placeholder="00000"
                ariaLabel="Invoice number"
                className="sm:text-right w-auto max-w-[140px] font-semibold"
              />
            </div>
            <div className="flex sm:justify-end items-center gap-2">
              <span className="uppercase">Date:</span>
              <input
                type="date"
                value={data.date}
                onChange={(e) => set('date', e.target.value)}
                aria-label="Invoice date"
                className="field sm:text-right w-auto max-w-[180px] font-semibold"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Bill To */}
      <div className="mt-8 sm:mt-12 max-w-md">
        <div className="text-[13px] sm:text-[14px] text-slate-700 font-medium mb-0.5">
          To:
        </div>
        <div className="space-y-0.5 text-[13px] sm:text-[14px] text-slate-800">
          <EditableText
            value={data.billTo.name}
            onChange={(v) => set('billTo', { ...data.billTo, name: v })}
            placeholder="Client / Company Name"
            ariaLabel="Bill-to name"
          />
          <EditableText
            value={data.billTo.address}
            onChange={(v) => set('billTo', { ...data.billTo, address: v })}
            placeholder="Client address"
            ariaLabel="Bill-to address"
            multiline
          />
          <EditableText
            value={data.billTo.phone}
            onChange={(v) => set('billTo', { ...data.billTo, phone: v })}
            placeholder="Phone"
            ariaLabel="Bill-to phone"
            inputMode="tel"
          />
        </div>
      </div>

      {/* Line items */}
      <LineItemsTable
        descriptionColumnLabel={data.itemDescriptionColumnLabel}
        onDescriptionColumnLabelChange={(v) =>
          set('itemDescriptionColumnLabel', v)
        }
        items={data.items}
        onChange={(items) => set('items', items)}
      />

      {/* Payment methods card */}
      <div className="mt-8 sm:mt-10">
        <div className="rounded-xl border border-teal-accent/25 bg-teal-accent/[0.04] overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-teal-accent/20">
            {/* Bank Transfer */}
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="grid place-items-center h-7 w-7 rounded-full bg-teal-accent/15 text-teal-accent">
                  <Landmark size={15} />
                </span>
                <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-teal-accent">
                  Bank Transfer
                </span>
              </div>
              <div className="space-y-2 text-[13px] sm:text-[13.5px] text-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-slate-500 w-[58px] shrink-0">
                    Bank
                  </span>
                  <EditableText
                    value={data.bank.name}
                    onChange={(v) => set('bank', { ...data.bank, name: v })}
                    placeholder="Bank name"
                    ariaLabel="Bank name"
                    className="font-medium"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-slate-500 w-[58px] shrink-0">
                    Routing
                  </span>
                  <EditableText
                    value={data.bank.routing}
                    onChange={(v) => set('bank', { ...data.bank, routing: v })}
                    placeholder="Routing #"
                    ariaLabel="Routing number"
                    inputMode="numeric"
                    className="tabular-nums"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-slate-500 w-[58px] shrink-0">
                    Account
                  </span>
                  <EditableText
                    value={data.bank.account}
                    onChange={(v) => set('bank', { ...data.bank, account: v })}
                    placeholder="Account #"
                    ariaLabel="Account number"
                    inputMode="numeric"
                    className="tabular-nums"
                  />
                </div>
              </div>
            </div>

            {/* Zelle */}
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="grid place-items-center h-7 w-7 rounded-full bg-teal-accent/15 text-teal-accent">
                  <Smartphone size={15} />
                </span>
                <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-teal-accent">
                  Zelle
                </span>
              </div>
              <div className="flex items-center gap-2 text-[13px] sm:text-[13.5px] text-slate-800">
                <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-slate-500 w-[58px] shrink-0">
                  Send to
                </span>
                <EditableText
                  value={data.bank.zelle}
                  onChange={(v) => set('bank', { ...data.bank, zelle: v })}
                  placeholder="Zelle phone or email"
                  ariaLabel="Zelle"
                  inputMode="tel"
                  className="font-medium tabular-nums"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="mt-5 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[12.5px] sm:text-[13px] text-slate-700">
          <span>Total due in</span>
          <EditableNumber
            value={data.terms.dueDays}
            onChange={(v) => set('terms', { ...data.terms, dueDays: v })}
            ariaLabel="Days until due"
            className="w-[44px] text-center font-semibold text-teal-accent"
            min={0}
          />
          <span>days. Overdue accounts subject to a service charge of</span>
          <EditableNumber
            value={data.terms.lateFeePercent}
            onChange={(v) => set('terms', { ...data.terms, lateFeePercent: v })}
            ariaLabel="Late fee percent"
            className="w-[44px] text-center font-semibold text-teal-accent"
            min={0}
            decimals={2}
            step={0.1}
          />
          <span>% per month.</span>
        </div>
      </div>

      {/* Thanks */}
      <div className="mt-8 sm:mt-12">
        <EditableText
          value={data.thanks}
          onChange={(v) => set('thanks', v)}
          placeholder="THANKS FOR YOUR BUSINESS!"
          ariaLabel="Closing note"
          className="font-semibold tracking-wide text-[14px] sm:text-[15px] text-teal-accent uppercase"
          autoCapitalize="characters"
        />
      </div>
    </section>
  );
}
