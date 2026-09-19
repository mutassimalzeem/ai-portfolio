"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ScrambleText } from "./interactions";
import { cn } from "@/lib/utils";

/**
 * Editorial section header: mono index + kicker, a hairline rule that
 * runs to the edge, then the display title. One word can swing in
 * italic serif for contrast.
 */
export function SectionHeading({
  index,
  kicker,
  title,
  serif,
  className,
}: {
  index: string;
  kicker: string;
  title: string;
  /** Optional word rendered in italic serif at the end of the title. */
  serif?: string;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={className}>
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45 }}
        className="flex items-center gap-3"
      >
        <span className="font-mono text-[11px] font-medium tracking-wide text-safety">
          ({index})
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          {kicker}
        </span>
        <span className="h-px flex-1 bg-border" aria-hidden />
      </motion.div>

      <motion.h2
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.06 }}
        className={cn("type-display mt-4 text-4xl sm:text-5xl")}
      >
        <ScrambleText text={title} />
        {serif && (
          <>
            {" "}
            <span className="type-serif-accent text-safety">
              <ScrambleText text={serif} />
            </span>
          </>
        )}
      </motion.h2>
    </div>
  );
}
