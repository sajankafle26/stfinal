'use client';
import React, { useEffect, useRef, useState } from 'react';

type ShiftItem = {
  id: string;
  title: string;
  time?: string;
  notes?: string[];
};

export default function ShiftPopover({
  items = [],
  buttonLabel = 'Shift Options',
  className = '',
}: {
  items: ShiftItem[];
  buttonLabel?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!open) return;
      const t = e.target as Node;
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(t)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="shift-popover-panel"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900/30"
      >
        {buttonLabel}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          className={`transition ${open ? 'rotate-180' : ''}`}
          fill="none"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="#0f172a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Panel */}
      <div
        ref={panelRef}
        id="shift-popover-panel"
        role="dialog"
        aria-modal="false"
        className={[
          'absolute right-0 z-50 mt-2 w-[min(92vw,360px)] origin-top-right rounded-2xl border border-slate-200 bg-white shadow-2xl outline-none',
          'transition transform',
          open ? 'opacity-100 scale-100' : 'pointer-events-none opacity-0 scale-95',
        ].join(' ')}
      >
        {/* Caret */}
        <span className="absolute -top-2 right-8 h-3 w-3 rotate-45 bg-white border border-slate-200 border-b-0 border-r-0" />

        <div className="p-4">
          <div className="px-1 pb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Shift Options (for student benefit)
          </div>

          <ul className="divide-y divide-slate-200">
            {items.map((it) => (
              <li key={it.id} className="py-3">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-slate-900" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-900">{it.title}</span>
                    {it.time && (
                      <span className="text-sm text-slate-500">{it.time}</span>
                    )}
                  </div>
                </div>

                {it.notes && it.notes.length > 0 && (
                  <ul className="mt-2 pl-6 space-y-1">
                    {it.notes.map((n, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                        <svg
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                          fill="none"
                          className="mt-0.5 flex-none"
                        >
                          <path
                            d="M5 13l4 4L19 7"
                            stroke="#0f172a"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{n}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-sm font-semibold text-slate-700 hover:text-slate-900"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}