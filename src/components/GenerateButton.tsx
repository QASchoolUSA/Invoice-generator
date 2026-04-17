import { Download, Loader2 } from 'lucide-react';

type Props = {
  loading?: boolean;
  onClick: () => void;
  className?: string;
};

export function GenerateButton({ loading, onClick, className = '' }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className={`no-print inline-flex items-center justify-center gap-2
        h-12 px-5 rounded-xl font-semibold text-[14px]
        bg-teal-accent text-white shadow-lg shadow-teal-accent/25
        hover:bg-[#3f6a72] active:bg-[#365d65]
        disabled:opacity-70 disabled:cursor-not-allowed
        focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-accent/60 focus-visible:ring-offset-2
        transition-colors ${className}`}
    >
      {loading ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          Generating…
        </>
      ) : (
        <>
          <Download size={18} />
          Generate Invoice
        </>
      )}
    </button>
  );
}
