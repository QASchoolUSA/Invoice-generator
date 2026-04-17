import { useCallback, useState } from 'react';
import { GenerateButton } from './components/GenerateButton';
import { InvoiceEditor } from './components/InvoiceEditor';
import { makeDefaultInvoice } from './defaults';
import type { Invoice } from './types';

export default function App() {
  const [data, setData] = useState<Invoice>(() => makeDefaultInvoice());
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onGenerate = useCallback(async () => {
    setError(null);
    setGenerating(true);
    try {
      const { downloadInvoice } = await import('./pdf/generate');
      await downloadInvoice(data);
    } catch (e) {
      console.error(e);
      setError(
        e instanceof Error ? e.message : 'Failed to generate PDF. Try again.',
      );
    } finally {
      setGenerating(false);
    }
  }, [data]);

  return (
    <div className="min-h-full pb-[96px] sm:pb-16">
      {/* Top bar */}
      <header className="no-print sticky top-0 z-20 backdrop-blur bg-white/70 border-b border-slate-200/70">
        <div className="max-w-[920px] mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-teal-accent grid place-items-center text-white font-semibold">
              I
            </div>
            <span className="font-semibold text-slate-800 text-[15px] sm:text-[16px]">
              Invoice Generator
            </span>
          </div>
          <div className="hidden sm:block">
            <GenerateButton loading={generating} onClick={onGenerate} />
          </div>
        </div>
      </header>

      {/* Paper */}
      <main className="max-w-[920px] mx-auto px-3 sm:px-6 pt-5 sm:pt-10">
        {error && (
          <div className="no-print mb-4 rounded-lg border border-red-200 bg-red-50 text-red-800 px-4 py-2.5 text-sm">
            {error}
          </div>
        )}
        <InvoiceEditor data={data} onChange={setData} />
        <p className="no-print text-center text-xs text-slate-500 mt-6">
          Tap any field to edit. Your data stays in your browser — nothing is
          uploaded.
        </p>
      </main>

      {/* Mobile sticky CTA */}
      <div
        className="no-print sm:hidden fixed bottom-0 inset-x-0 z-30
                   bg-white/95 backdrop-blur border-t border-slate-200
                   px-4 py-3"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)' }}
      >
        <GenerateButton
          loading={generating}
          onClick={onGenerate}
          className="w-full h-12"
        />
      </div>
    </div>
  );
}
