import { Plus, Trash2 } from 'lucide-react';
import type { LineItem } from '../types';
import { rowAmount, totalAmount } from '../utils/calc';
import { formatCurrency } from '../utils/format';
import { EditableNumber, EditableText } from './EditableText';
import { newLineItem } from '../defaults';

type Props = {
  descriptionColumnLabel: string;
  onDescriptionColumnLabelChange: (v: string) => void;
  items: LineItem[];
  onChange: (items: LineItem[]) => void;
};

export function LineItemsTable({
  descriptionColumnLabel,
  onDescriptionColumnLabelChange,
  items,
  onChange,
}: Props) {
  const update = (id: string, patch: Partial<LineItem>) => {
    onChange(items.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  };
  const remove = (id: string) => {
    if (items.length <= 1) {
      onChange([newLineItem()]);
      return;
    }
    onChange(items.filter((it) => it.id !== id));
  };
  const add = () => onChange([...items, newLineItem()]);

  const total = totalAmount(items);

  return (
    <div className="mt-6">
      {/* Desktop/tablet header */}
      <div className="hidden sm:grid grid-cols-[1fr_96px_120px_120px_32px] gap-3 border-b border-teal-accent/60 pb-2 text-[11px] font-semibold tracking-[0.14em] text-teal-accent uppercase">
        <div className="min-w-0">
          <EditableText
            value={descriptionColumnLabel}
            onChange={onDescriptionColumnLabelChange}
            placeholder="Column name"
            ariaLabel="Line items first column header"
            className="text-[11px] font-semibold tracking-[0.14em] text-teal-accent uppercase"
          />
        </div>
        <div className="text-center">Quantity</div>
        <div className="text-right">Price</div>
        <div className="text-right">Amount</div>
        <div />
      </div>

      {/* Desktop rows */}
      <div className="hidden sm:block divide-y divide-teal-accent/15">
        {items.map((it) => (
          <div
            key={it.id}
            className="group grid grid-cols-[1fr_96px_120px_120px_32px] gap-3 py-2.5 items-center"
          >
            <EditableText
              value={it.description}
              onChange={(v) => update(it.id, { description: v })}
              placeholder="Line item"
              ariaLabel={`${descriptionColumnLabel || 'Line item'} text`}
              className="text-[14px] text-slate-800"
            />
            <EditableNumber
              value={it.quantity}
              onChange={(v) => update(it.id, { quantity: v })}
              ariaLabel="Quantity"
              className="text-center text-[14px] text-slate-800"
              min={0}
            />
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pointer-events-none text-slate-500 text-[14px]">
                $
              </span>
              <EditableNumber
                value={it.price}
                onChange={(v) => update(it.id, { price: v })}
                ariaLabel="Unit price"
                className="text-right text-[14px] text-slate-800 pl-4"
                min={0}
                decimals={2}
                step={0.01}
              />
            </div>
            <div className="text-right text-[14px] tabular-nums text-slate-800 font-medium">
              {formatCurrency(rowAmount(it))}
            </div>
            <button
              type="button"
              onClick={() => remove(it.id)}
              className="no-print opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity text-slate-400 hover:text-red-600 justify-self-end p-1 rounded-md"
              aria-label="Remove item"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-3">
        {items.map((it, idx) => (
          <div
            key={it.id}
            className="rounded-xl border border-teal-accent/20 bg-teal-accent/[0.04] p-3"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-teal-accent">
                Item {idx + 1}
              </span>
              <button
                type="button"
                onClick={() => remove(it.id)}
                className="no-print text-slate-400 hover:text-red-600 p-2 -m-2 rounded-md"
                aria-label="Remove item"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <div className="block text-[10px] font-semibold tracking-[0.14em] uppercase text-slate-500 mb-0.5">
              {idx === 0 ? (
                <EditableText
                  value={descriptionColumnLabel}
                  onChange={onDescriptionColumnLabelChange}
                  placeholder="Column name"
                  ariaLabel="Line items first column header"
                  className="text-[10px] font-semibold tracking-[0.14em] uppercase text-slate-500"
                />
              ) : (
                descriptionColumnLabel
              )}
            </div>
            <EditableText
              value={it.description}
              onChange={(v) => update(it.id, { description: v })}
              placeholder="Line item"
              ariaLabel={`${descriptionColumnLabel || 'Line item'} text`}
              className="text-[15px] text-slate-900"
              multiline
            />
            <div className="mt-3 grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-semibold tracking-[0.14em] uppercase text-slate-500 mb-0.5">
                  Qty
                </label>
                <EditableNumber
                  value={it.quantity}
                  onChange={(v) => update(it.id, { quantity: v })}
                  ariaLabel="Quantity"
                  className="text-left text-[15px] text-slate-900"
                  min={0}
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold tracking-[0.14em] uppercase text-slate-500 mb-0.5">
                  Price
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pointer-events-none text-slate-500 text-[15px]">
                    $
                  </span>
                  <EditableNumber
                    value={it.price}
                    onChange={(v) => update(it.id, { price: v })}
                    ariaLabel="Unit price"
                    className="text-left text-[15px] text-slate-900 pl-4"
                    min={0}
                    decimals={2}
                    step={0.01}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-semibold tracking-[0.14em] uppercase text-slate-500 mb-0.5">
                  Amount
                </label>
                <div className="text-[15px] tabular-nums text-slate-900 font-medium py-1">
                  {formatCurrency(rowAmount(it))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add row + total */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={add}
          className="no-print inline-flex items-center gap-1.5 text-[13px] font-medium text-teal-accent hover:text-teal-accent/80 px-2 py-1.5 -ml-2 rounded-md"
        >
          <Plus size={16} />
          Add item
        </button>

        <div className="flex items-baseline gap-4 sm:gap-6 border-t border-teal-accent/60 pt-2 min-w-[240px] justify-end">
          <span className="italic text-teal-accent tracking-[0.12em] text-[13px] sm:text-[14px] font-semibold">
            TOTAL
          </span>
          <span className="text-[15px] sm:text-[16px] font-semibold tabular-nums text-teal-accent">
            {formatCurrency(total)}
          </span>
        </div>
      </div>
    </div>
  );
}
