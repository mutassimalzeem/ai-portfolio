"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useToast } from "@/hooks/use-toast";

/** Hydration-safe media-query hook (false on the server). */
export function useMedia(query: string): boolean {
  const subscribe = useCallback(
    (cb: () => void) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    [query]
  );
  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = useCallback(() => false, []);
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Custom cursor: a red dot with a lagging green ring that swells over
 * interactive elements. Desktop (fine pointer) only; disabled for
 * reduced-motion users and on touch devices.
 */
export function CustomCursor() {
  const fine = useMedia("(pointer: fine)");
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const enabled = fine && !reduced;

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target as HTMLElement | null;
      const interactive = !!t?.closest(
        "a, button, [role='button'], [role='tab'], [cmdk-root], [data-cursor]"
      );
      const overText = !!t?.closest("input, textarea");
      root.classList.toggle("cursor-active", interactive && !overText);
      root.classList.toggle("cursor-over-text", overText);
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (dotRef.current) dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      root.classList.remove("has-custom-cursor", "cursor-active", "cursor-over-text");
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={ringRef} aria-hidden className="cursor-ring" />
      <div ref={dotRef} aria-hidden className="cursor-dot" />
    </>
  );
}

/** Fixed film-grain overlay for tactile depth. */
export function NoiseOverlay() {
  return (
    <div
      aria-hidden
      className="noise-overlay pointer-events-none fixed inset-0 z-[90] opacity-[0.05]"
    />
  );
}

/**
 * Scroll progress: a hairline track, an ink fill, and a safety-orange
 * chip that rolls across the top of the page as you read.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const discRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      const p = max > 0 ? Math.min(el.scrollTop / max, 1) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      if (discRef.current) {
        discRef.current.style.transform = `translateX(${p * (window.innerWidth - 12)}px) rotate(${p * 720}deg)`;
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[70]">
      <div className="absolute inset-x-0 top-[5px] h-px bg-foreground/10" />
      <div
        ref={barRef}
        className="absolute inset-x-0 top-[5px] h-px origin-left bg-foreground/40"
        style={{ transform: "scaleX(0)" }}
      />
      <div
        ref={discRef}
        data-progress-disc
        className="absolute top-0 size-3 rounded-[3px] bg-safety"
        style={{ transform: "translateX(0px)" }}
      />
    </div>
  );
}

const KONAMI = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];

/** The classic cheat code — rewards the curious with falling commit cells. */
export function KonamiListener() {
  const { toast } = useToast();
  const toastRef = useRef(toast);
  const [burst, setBurst] = useState(false);
  const idx = useRef(0);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    toastRef.current = toast;
  }, [toast]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === KONAMI[idx.current]) {
        idx.current += 1;
        if (idx.current === KONAMI.length) {
          idx.current = 0;
          setBurst(true);
          toastRef.current({
            title: "KONAMI CODE ACCEPTED",
            description:
              "The commit cells are falling. You clearly know your way around a keyboard.",
          });
          window.clearTimeout(timer.current);
          timer.current = window.setTimeout(() => setBurst(false), 3600);
        }
      } else {
        idx.current = k === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(timer.current);
    };
  }, []);

  if (!burst) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[95] overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => {
        const left = (i * 37 + 11) % 100;
        const size = 7 + (i % 4) * 3;
        const duration = 1.7 + ((i * 7) % 10) / 8;
        const delay = ((i * 13) % 10) / 22;
        const background =
          i % 3 === 0
            ? "var(--safety)"
            : i % 3 === 1
              ? "var(--foreground)"
              : "color-mix(in srgb, var(--safety) 45%, transparent)";
        const radius = i % 5 === 0 ? "999px" : "3px";
        return (
          <span
            key={i}
            className="fall-cell"
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              background,
              borderRadius: radius,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}
