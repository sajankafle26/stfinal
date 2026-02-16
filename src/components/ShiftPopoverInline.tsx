'use client';

import React, { useEffect, useRef, useState } from 'react';

export type ShiftItem = {
  id: string;
  title: string;
  time?: string;
  notes?: string[];
};

type Placement = 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';

export default function ShiftPopoverInline({
  items,
  children,
  side = 'bottom-right',
  className = '',
  selectedId,
  onSelect,
  onOpenChange,
  withCaret = true,
}: {
  items: ShiftItem[];
  /** The chip/button that triggers the popover */
  children: React.ReactNode;
  /** Popover placement relative to the trigger */
  side?: Placement;
  className?: string;
  /** Controlled selected shift id (optional) */
  selectedId?: string;
  /** Callback when a shift is selected (optional) */
  onSelect?: (item: ShiftItem) => void;
  /** Callback when open state changes (optional) */
  onOpenChange?: (open: boolean) => void;
  /** Show the small caret/arrow (default true) */
  withCaret?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [internalSelectedId, setInternalSelectedId] = useState<string | undefined>(selectedId);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Sync controlled selectedId
  useEffect(() => {
    if (typeof selectedId !== 'undefined') {
      setInternalSelectedId(selectedId);
    }
  }, [selectedId]);

  // Close on outside click
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!open) return;
      const t = e.target as Node;
      if (wrapperRef.current && !wrapperRef.current.contains(t)) {
        setOpen(false);
        onOpenChange?.(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open, onOpenChange]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        onOpenChange?.(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onOpenChange]);

  // Positioning classes
  const pos =
    side === 'top-right'
      ? 'bottom-full right-0 mb-2 origin-bottom-right'
      : side === 'bottom-right'
        ? 'top-full right-0 mt-2 origin-top-right'
        : side === 'top-left'
          ? 'bottom-full left-0 mb-2 origin-bottom-left'
          : 'top-full left-0 mt-2 origin-top-left';

  const caretPlacement =
    side.includes('top')
      ? 'bottom-[-6px]'
      : 'top-[-6px]';

  const caretSide = side.includes('right') ? 'right-6' : 'left-6';

  const handleOpenToggle = () => {
    setOpen((v) => {
      onOpenChange?.(!v);
      return !v;
    });
  };

  const handleSelect = (item: ShiftItem) => {
    // Internal selection if uncontrolled
    if (typeof selectedId === 'undefined') {
      setInternalSelectedId(item.id);
    }
    onSelect?.(item);
    // Optional: auto-close after select
    setOpen(false);
    onOpenChange?.(false);
  };

  return (
    <div ref={wrapperRef} className={`relative inline-block ${className}`}>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="shift-popover-inline-panel"
        onClick={handleOpenToggle}
        className="group focus:outline-none"
      >
        {children}
      </button>

      {/* Panel */}
      <div
        ref={panelRef}
        id="shift-popover-inline-panel"
        role="dialog"
        aria-modal="false"
        className={[
          'absolute z-[100] w-[min(92vw,360px)] rounded-2xl border border-slate-200 bg-white shadow-2xl',
          'transition transform',
          pos,
          open ? 'opacity-100 scale-100' : 'pointer-events-none opacity-0 scale-95',
        ].join(' ')}
      >
        {/* Caret */}
        {withCaret && (
          <span
            className={[
              'absolute h-3 w-3 bg-white border border-slate-200 rotate-45',
              caretPlacement,
              caretSide,
              side.includes('top') ? 'border-t-0 border-l-0' : 'border-b-0 border-r-0',
            ].join(' ')}
          />
        )}

        <div className="p-4">
          <div className="px-1 pb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Internship Shifts
          </div>

          <ul className="divide-y divide-slate-200">
            {items.map((it) => {
              const selected = (internalSelectedId ?? selectedId) === it.id;
              return (
                <li key={it.id} className="py-2.5">
                  <button
                    type="button"
                    onClick={() => handleSelect(it)}
                    className={[
                      'w-full text-left rounded-xl px-2.5 py-2 transition',
                      selected
                        ? 'bg-slate-900/5 ring-1 ring-slate-300'
                        : 'hover:bg-slate-100/80',
                    ].join(' ')}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={[
                          'inline-flex h-2.5 w-2.5 rounded-full',
                          selected ? 'bg-slate-900' : 'bg-slate-400',
                        ].join(' ')}
                      />
                      <div className="flex flex-row gap-4 items-center">
                        <span className="font-semibold text-slate-900">{it.title}</span>
                        {it.time && (
                          <span className="text-sm text-slate-500">{it.time}</span>
                        )}
                      </div>
                    </div>

                    {it.notes?.length ? (
                      <ul className="mt-2 pl-6 space-y-1">
                        {it.notes.map((n, i) => (
                          <li
                            key={i}
                            className="text-sm text-slate-600 flex items-start gap-2"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              width="16"
                              height="16"
                              className="mt-0.5"
                              fill="none"
                              aria-hidden="true"
                            >
                              <path
                                d="M5 13l4 4L19 7"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span>{n}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onOpenChange?.(false);
              }}
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