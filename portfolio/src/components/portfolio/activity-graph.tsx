"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const WEEKS = 26;

function pseudo(i: number): number {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

interface Cell {
  level: number;
  commits: number;
}

function buildCells(): Cell[] {
  const cells: Cell[] = [];
  for (let i = 0; i < WEEKS * 7; i++) {
    const week = Math.floor(i / 7);
    const recency = week / WEEKS; // denser toward "now"
    const r = pseudo(i);
    const v = r * (0.5 + recency * 0.7);
    const level = v > 0.78 ? 4 : v > 0.6 ? 3 : v > 0.42 ? 2 : v > 0.24 ? 1 : 0;
    cells.push({ level, commits: level === 0 ? 0 : Math.round(v * 9) + 1 });
  }
  return cells;
}

const LEVEL_BG = ["bg-secondary", "bg-safety/25", "bg-safety/45", "bg-safety/70", "bg-safety"];

export function ActivityGraph() {
  const cells = useMemo(() => buildCells(), []);
  const reduce = useReducedMotion();

  return (
    <div className="border border-border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-lg font-semibold">Commit activity</h3>
        <p className="font-mono text-[11px] text-muted-foreground">
          embellished for demo — the real one lives on GitHub
        </p>
      </div>

      <div
        className="term-scroll mt-4 grid w-max grid-flow-col grid-rows-7 gap-[3px] overflow-x-auto pb-1"
        role="img"
        aria-label="A decorative heatmap of commit activity over the last 26 weeks, denser in recent weeks"
      >
        {cells.map((cell, i) => (
          <motion.span
            key={i}
            title={cell.commits > 0 ? `${cell.commits} commits` : "no commits"}
            initial={reduce ? false : { scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.2, delay: i * 0.004 }}
            className={`size-2.5 shrink-0 rounded-[3px] ${LEVEL_BG[cell.level]}`}
          />
        ))}
      </div>

      <div className="mt-3 flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
        <span>less</span>
        {LEVEL_BG.map((bg, i) => (
          <span key={i} className={`size-2.5 rounded-[3px] ${bg}`} aria-hidden />
        ))}
        <span>more</span>
      </div>
    </div>
  );
}
