"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SKILL_GROUPS } from "./data";
import { SectionHeading } from "./section-heading";
import { spotMove } from "./interactions";
import { cn } from "@/lib/utils";

// Bento with intentional size variation — the backend group is the anchor tile.
const SPANS: Record<string, string> = {
  backend: "sm:col-span-2 sm:row-span-2",
  ml: "sm:col-span-2",
  core: "",
  frontend: "",
  design: "",
};

export function Skills() {
  const reduceMotion = useReducedMotion();
  const reveal = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.55, delay },
  });

  return (
    <section id="skills" className="section-anchor py-20 sm:py-28" aria-label="Skills">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading index="02" kicker="Toolbox" title="Five shelves," serif="one daily driver." />
        <motion.p {...reveal(0.08)} className="mt-4 max-w-xl text-muted-foreground">
          The backend shelf gets the most use — that&apos;s where the architecture
          decisions live. Everything else exists to ship the whole thing.
        </motion.p>

        <div className="mt-10 grid auto-rows-[minmax(150px,auto)] grid-cols-1 gap-4 sm:grid-cols-3">
          {SKILL_GROUPS.map((group, i) => {
            const isAnchor = group.id === "backend";
            return (
              <motion.div
                key={group.id}
                {...reveal(0.1 + i * 0.07)}
                onMouseMove={spotMove}
                className={cn(
                  "spotlight group flex flex-col border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/40 sm:p-6",
                  SPANS[group.id]
                )}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold">
                    <span className="mr-2 font-mono text-[11px] font-normal tracking-wide text-safety">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {group.title}
                  </h3>
                  {isAnchor && (
                    <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-safety">
                      <span className="size-1.5 rounded-[1px] bg-safety" aria-hidden />
                      daily driver
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{group.note}</p>
                <ul
                  className={cn(
                    "mt-4 flex flex-col gap-2 text-sm",
                    isAnchor && "sm:my-5 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-3 sm:text-base"
                  )}
                >
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-2.5 transition-transform duration-200 group-hover:translate-x-0.5"
                    >
                      <span
                        className={cn(
                          "size-1.5 shrink-0 rounded-[1px]",
                          isAnchor ? "bg-safety" : "bg-foreground/40"
                        )}
                        aria-hidden
                      />
                      <span className={isAnchor ? "font-medium" : "text-foreground/80"}>
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
                {isAnchor && (
                  <p className="mt-auto border-t border-border pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    The rotation — design schema <span className="text-safety">·</span> ship
                    endpoint <span className="text-safety">·</span> watch logs{" "}
                    <span className="text-safety">·</span> repeat
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
