"use client";

import { TICKER_ITEMS } from "./data";

export function TechTicker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div
      className="border-y border-border bg-foreground py-3 text-background"
      aria-label="Technologies I work with"
    >
      <div className="relative overflow-hidden">
        <div className="marquee-track flex w-max animate-marquee items-center gap-8 pr-8">
          {items.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex items-center gap-8 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.2em]"
              aria-hidden={i >= TICKER_ITEMS.length}
            >
              {item}
              <span className="text-safety" aria-hidden>
                ✕
              </span>
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-foreground to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-foreground to-transparent" />
      </div>
    </div>
  );
}
