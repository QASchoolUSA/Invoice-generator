import { useEffect, useRef } from 'react';

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

export function EditableNumber({
  value,
  onChange,
  placeholder,
  className = '',
  ariaLabel,
  min = 0,
  step = 1,
  decimals = 0,
}: NumberProps) {
  const display = Number.isFinite(value)
    ? decimals > 0
      ? value.toString()
      : Number.isInteger(value)
        ? value.toString()
        : value.toString()
    : '';

  return (
    <input
      type="text"
      inputMode={decimals > 0 ? 'decimal' : 'numeric'}
      aria-label={ariaLabel}
      className={`field cell-num ${className}`}
      value={display}
      placeholder={placeholder}
      onChange={(e) => {
        const raw = e.target.value.replace(/[^0-9.\-]/g, '');
        if (raw === '' || raw === '-' || raw === '.') {
          onChange(0);
          return;
        }
        const n = Number(raw);
        if (!Number.isFinite(n)) return;
        const clamped = min !== undefined && n < min ? min : n;
        onChange(clamped);
      }}
      onBlur={(e) => {
        const n = Number(e.target.value);
        if (!Number.isFinite(n)) onChange(0);
      }}
      step={step}
    />
  );
}
