"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PROFILE } from "./data";
import { Magnetic, ScrambleText } from "./interactions";

/** Live local time in Dhaka — placeholder until mounted (hydration-safe). */
function DhakaClock() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Dhaka",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{time}</span>;
}

export function Hero() {
  const reduceMotion = useReducedMotion();

  const lines = [
    { text: "I build the", serif: "" },
    { text: "systems behind", serif: "" },
    { text: "the ", serif: "interface." },
  ];

  return (
    <section id="top" className="relative overflow-hidden pt-24 sm:pt-28" aria-label="Introduction">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* Structural hairline columns — the layout grid made visible */}
        <div aria-hidden className="hero-columns pointer-events-none absolute inset-0 hidden md:block" />

        {/* Byline row: name on the left, live Dhaka time on the right */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="relative flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-border pb-4 font-mono text-[11px] uppercase tracking-[0.18em]"
        >
          <p className="text-muted-foreground">
            <ScrambleText text={`${PROFILE.name} · ${PROFILE.role}`} />
          </p>
          <p className="hidden items-center gap-2 text-muted-foreground sm:flex">
            <span className="size-1.5 rounded-[1px] bg-safety" aria-hidden />
            Dhaka, Bangladesh — <DhakaClock /> GMT+6
          </p>
        </motion.div>

        {/* The statement */}
        <h1 className="type-display relative mt-8 text-[clamp(2.6rem,8vw,6.5rem)] sm:mt-12">
          {lines.map((line, i) => (
            <span key={line.text} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={reduceMotion ? false : { y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.65, delay: 0.4 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                {line.text}
                {line.serif && (
                  <span className="type-serif-accent text-safety">{line.serif}</span>
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Copy + portrait */}
        <div className="relative mt-10 grid gap-12 pb-14 sm:mt-14 sm:pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:pb-20">
          <div>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="max-w-md text-base leading-relaxed text-foreground/75 sm:text-lg"
            >
              {PROFILE.tagline}
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.05 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <Button
                  asChild
                  size="lg"
                  className="rounded-none px-7 font-semibold tracking-tight transition-colors duration-300 hover:bg-safety hover:text-white"
                >
                  <a href="#work">
                    See the work
                    <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                </Button>
              </Magnetic>
              <Magnetic strength={0.22}>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-none px-7 font-semibold tracking-tight transition-colors duration-300 hover:border-foreground hover:bg-foreground hover:text-background dark:border-foreground/45 dark:hover:border-foreground"
                >
                  <a href={PROFILE.resume} target="_blank" rel="noopener noreferrer">
                    <FileText className="size-4" aria-hidden />
                    Résumé
                  </a>
                </Button>
              </Magnetic>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.25 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
            >
              <span className="inline-flex items-center gap-2">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-safety opacity-60" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-safety" />
                </span>
                {PROFILE.availability}
              </span>
              <span className="hidden h-3 w-px bg-border sm:block" aria-hidden />
              <span>Replies within a day</span>
            </motion.div>
          </div>

          {/* The portrait — a print, matted and captioned */}
          <motion.figure
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="group relative mx-auto w-full max-w-[340px] sm:max-w-[380px] lg:justify-self-end"
          >
            <div className="border border-foreground/15 bg-card p-2 shadow-[6px_6px_0_0_color-mix(in_srgb,var(--foreground)_8%,transparent)] transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:rotate-[0.35deg]">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={PROFILE.photo}
                  alt="Portrait of Mutassim Al Shahriar Zeem"
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 380px, 86vw"
                  className="object-cover grayscale-[25%] transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
                  priority
                  loading="eager"
                />
              </div>
              <figcaption className="flex items-center justify-between px-1 pt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                <span>Zeem — Backend &amp; AI</span>
                <span>23.81° N, 90.41° E</span>
              </figcaption>
            </div>
            <span
              className="absolute -right-3 -top-3 rotate-[5deg] bg-safety px-2.5 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-white shadow-lg shadow-safety/25 transition-transform duration-300 group-hover:rotate-[7deg]"
              aria-hidden
            >
              Open to work ↗
            </span>
          </motion.figure>
        </div>

        {/* Bottom strip */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="relative flex items-center justify-between border-t border-border py-4"
        >
          <a
            href="#about"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowDown className="size-3.5 animate-bounce" aria-hidden />
            Scroll, or press K to navigate
          </a>
          <p className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground sm:block">
            Est. 2024 — Dhaka
          </p>
        </motion.div>
      </div>
    </section>
  );
}
