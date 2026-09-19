"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { PROFILE, STATS } from "./data";
import { SectionHeading } from "./section-heading";
import { ActivityGraph } from "./activity-graph";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const duration = 900;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduceMotion]);

  return (
    <span ref={ref} className="type-display text-4xl text-foreground sm:text-5xl">
      {display}
      <span className="text-safety">{suffix}</span>
    </span>
  );
}

export function About() {
  const reduceMotion = useReducedMotion();
  const reveal = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.55, delay },
  });

  return (
    <section id="about" className="section-anchor py-20 sm:py-28" aria-label="About">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading index="01" kicker="Profile" title="The human behind" serif="the shell." />

        <div className="mt-12 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <motion.div {...reveal(0.1)} className="space-y-6">
            {PROFILE.about.map((para) => (
              <p key={para.slice(0, 24)} className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                {para}
              </p>
            ))}
            <div className="flex items-center gap-4 border border-border bg-card p-4">
              <div className="relative size-14 shrink-0 overflow-hidden">
                <Image
                  src={PROFILE.photo}
                  alt={PROFILE.name}
                  fill
                  sizes="56px"
                  className="object-cover grayscale-[30%]"
                />
              </div>
              <div className="text-sm">
                <p className="font-semibold">{PROFILE.name}</p>
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                  BSc EEE @ IUT — class of 2028, Dhaka
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats — a hairline-divided ledger, not a wall of cards */}
          <div>
            <div className="grid grid-cols-2 border-t border-l border-border sm:grid-cols-2">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  {...reveal(0.12 + i * 0.08)}
                  className="group border-b border-r border-border p-6 transition-colors duration-300 hover:bg-secondary/60 sm:p-8"
                >
                  <Counter value={stat.value} suffix={stat.suffix} />
                  <p className="mt-3 font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-muted-foreground">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div {...reveal(0.25)} className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-3">
              {[
                {
                  tag: "Currently",
                  text: "Building Zyra — an AI assistant with memory, tools and opinions about productivity.",
                },
                {
                  tag: "Studying",
                  text: "Electrical & Electronics engineering at IUT, expected 2028.",
                },
                {
                  tag: "Previously",
                  text: "Two years of freelance design for 50+ clients — the eye for craft stuck around.",
                },
              ].map(({ tag, text }) => (
                <div key={tag} className="bg-card p-5 transition-colors duration-300 hover:bg-secondary/60">
                  <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-safety">
                    <span className="size-1.5 rounded-[1px] bg-safety" aria-hidden />
                    {tag}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div {...reveal(0.3)} className="mt-10">
          <ActivityGraph />
        </motion.div>
      </div>
    </section>
  );
}
