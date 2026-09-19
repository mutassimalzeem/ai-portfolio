"use client";

import { motion, useReducedMotion } from "framer-motion";
import { JOURNEY } from "./data";
import { SectionHeading } from "./section-heading";

export function Journey() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="journey" className="section-anchor py-20 sm:py-28" aria-label="Experience and education">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading index="04" kicker="Timeline" title="The journey" serif="so far." />
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mt-4 max-w-xl text-muted-foreground"
        >
          Design first, then code, now systems. Each step built on the last one.
        </motion.p>

        <ol className="mt-12 border-t border-border">
          {JOURNEY.map((item, i) => {
            const isWork = item.kind === "work";
            return (
              <motion.li
                key={`${item.period}-${item.title}`}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group grid gap-3 border-b border-border py-7 transition-colors duration-300 hover:bg-secondary/40 sm:grid-cols-[10rem_1fr] sm:gap-8 sm:py-8 lg:grid-cols-[12rem_1fr_1.1fr]"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground sm:pt-1.5">
                  {item.period}
                </p>

                <div>
                  <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-safety">
                    <span className="size-1.5 rounded-[1px] bg-safety" aria-hidden />
                    {isWork ? "Work" : "Education"}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-foreground/70">{item.place}</p>
                </div>

                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:pt-1.5">
                  {item.detail}
                </p>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
