import { useEffect, useRef, useState } from 'react';

type BaseProps = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
  ariaLabel?: string;
  multiline?: boolean;
  inputMode?: 'text' | 'numeric' | 'decimal' | 'tel' | 'email' | 'url';
  maxLength?: number;
  autoCapitalize?: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';
  spellCheck?: boolean;
};

export function EditableText({
  value,
  onChange,
  placeholder,
  className = '',
  ariaLabel,
  multiline = false,
  inputMode,
  maxLength,
  autoCapitalize,
  spellCheck = false,
}: BaseProps) {
  const taRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (multiline && taRef.current) {
      taRef.current.style.height = 'auto';
      taRef.current.style.height = `${taRef.current.scrollHeight}px`;
    }
  }, [value, multiline]);

  if (multiline) {
    return (
      <textarea
        ref={taRef}
        aria-label={ariaLabel}
        className={`field resize-none overflow-hidden leading-snug ${className}`}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        rows={1}
        maxLength={maxLength}
        spellCheck={spellCheck}
        autoCapitalize={autoCapitalize}
      />
    );
  }

  return (
    <input
      type="text"
      aria-label={ariaLabel}
      className={`field ${className}`}
      value={value}
      placeholder={placeholder}
      inputMode={inputMode}
      maxLength={maxLength}
      spellCheck={spellCheck}
      autoCapitalize={autoCapitalize}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

type NumberProps = {
  value: number;
  onChange: (v: number) => void;
  placeholder?: string;
  className?: string;
  ariaLabel?: string;
  min?: number;
  step?: number;
  decimals?: number;
};

function numberToDraft(n: number, decimals: number): string {
  if (!Number.isFinite(n) || n === 0) return '';
  if (decimals <= 0) return String(Math.trunc(n));
  const rounded = Math.round(n * 100) / 100;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2);
}

export function EditableNumber({
  value,
  onChange,
  placeholder,
  className = '',
  ariaLabel,
  min = 0,
  decimals = 0,
}: NumberProps) {
  const [focused, setFocused] = useState(false);
  const [draft, setDraft] = useState<string>(() =>
    numberToDraft(value, decimals),
  );

  useEffect(() => {
    if (!focused) setDraft(numberToDraft(value, decimals));
  }, [value, decimals, focused]);

  const allowDecimal = decimals > 0;
  const pattern = allowDecimal ? /^\d*\.?\d*$/ : /^\d*$/;

  return (
    <input
      type="text"
      inputMode={allowDecimal ? 'decimal' : 'numeric'}
      aria-label={ariaLabel}
      className={`field cell-num ${className}`}
      value={draft}
      placeholder={placeholder}
      onFocus={() => setFocused(true)}
      onChange={(e) => {
        let raw = e.target.value.replace(/,/g, '.');
        if (!pattern.test(raw)) return;
        if (allowDecimal) {
          const firstDot = raw.indexOf('.');
          if (firstDot !== -1) {
            raw =
              raw.slice(0, firstDot + 1) +
              raw.slice(firstDot + 1).replace(/\./g, '');
          }
        }
        setDraft(raw);

        if (raw === '' || raw === '.') {
          onChange(0);
          return;
        }
        const n = Number(raw);
        if (!Number.isFinite(n)) return;
        const clamped = n < min ? min : n;
        onChange(clamped);
      }}
      onBlur={() => {
        setFocused(false);
        const n = Number(draft);
        if (!Number.isFinite(n) || draft === '' || draft === '.') {
          onChange(0);
          setDraft('');
          return;
        }
        const clamped = n < min ? min : n;
        onChange(clamped);
        setDraft(numberToDraft(clamped, decimals));
      }}
    />
  );
}
