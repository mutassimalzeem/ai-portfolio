"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, GitBranch, Hammer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PROJECTS, type Project, type ProjectCategory } from "./data";
import { SectionHeading } from "./section-heading";
import { spotMove } from "./interactions";
import { cn } from "@/lib/utils";

type Filter = "all" | ProjectCategory;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "ai-ml", label: "AI & ML" },
  { id: "backend", label: "Backend" },
  { id: "data", label: "Data & ML" },
];

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseMove={spotMove}
      className="spotlight group flex h-full w-full flex-col border border-border bg-card p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-foreground/40 focus-visible:outline-2 focus-visible:outline-ring"
      aria-label={`Open details for ${project.name}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-[11px] tracking-wide text-safety">
          {String(index + 1).padStart(2, "0")}.
        </span>
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          <span>{project.year}</span>
          <span className="size-1 rounded-[1px] bg-foreground/30" aria-hidden />
          {project.status === "wip" ? (
            <span className="flex items-center gap-1 text-safety">
              <Hammer className="size-3" aria-hidden />
              In the works
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <GitBranch className="size-3" aria-hidden />
              Shipped
            </span>
          )}
        </div>
      </div>

      <h3 className="mt-4 font-display text-xl font-semibold leading-snug">
        {project.name}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">{project.tagline}</p>

      <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground/80">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.tech.slice(0, 4).map((t) => (
          <span
            key={t}
            className="border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
          >
            {t}
          </span>
        ))}
        {project.tech.length > 4 && (
          <span className="border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
            +{project.tech.length - 4}
          </span>
        )}
      </div>

      <span className="mt-auto inline-flex items-center gap-1.5 pt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-safety">
        Details
        <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
      </span>
    </button>
  );
}

function ProjectDialog({ project }: { project: Project }) {
  return (
    <DialogContent className="max-w-lg rounded-md border-border bg-card p-0">
      <div className="border-b border-border p-6 pb-5">
        <DialogHeader>
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em]">
            <span className="text-muted-foreground">{project.year}</span>
            <span className="size-1 rounded-[1px] bg-foreground/30" aria-hidden />
            <span className="text-safety">{project.categoryLabel}</span>
          </div>
          <DialogTitle className="mt-2 font-display text-2xl font-bold leading-tight">
            {project.name}
          </DialogTitle>
          <DialogDescription className="mt-1 text-base text-muted-foreground">
            {project.tagline}
          </DialogDescription>
        </DialogHeader>
      </div>

      <div className="p-6 pt-5">
        <p className="text-sm leading-relaxed text-foreground/85">{project.description}</p>

        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          Built with
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="border border-border bg-secondary px-2.5 py-1 font-mono text-xs text-secondary-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.repo ? (
            <Button
              asChild
              className="rounded-none font-semibold transition-colors duration-300 hover:bg-safety hover:text-white"
            >
              <a href={project.repo} target="_blank" rel="noopener noreferrer">
                <GitBranch className="size-4" aria-hidden />
                View on GitHub
              </a>
            </Button>
          ) : (
            <Badge
              variant="secondary"
              className="gap-1.5 rounded-none border border-safety/40 bg-safety/10 px-4 py-2 text-sm text-safety"
            >
              <Hammer className="size-3.5" aria-hidden />
              Under active development — public launch soon
            </Badge>
          )}
        </div>
      </div>
    </DialogContent>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const visible = useMemo(
    () => (filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  );

  const openProject = PROJECTS.find((p) => p.id === openId) ?? null;

  return (
    <section id="work" className="section-anchor py-20 sm:py-28" aria-label="Selected work">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading index="03" kicker="Selected" title="Work that" serif="shipped." />
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mt-4 max-w-xl text-muted-foreground"
        >
          Seven projects across AI, backend and data — each one built to answer a real
          question, not to pad a list. Open any card for the full story.
        </motion.p>

        <div
          className="mt-8 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {FILTERS.map(({ id, label }) => {
            const count = id === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.category === id).length;
            const active = filter === id;
            return (
              <button
                key={id}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(id)}
                className={cn(
                  "rounded-none border px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-all duration-200",
                  active
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                )}
              >
                {label}
                <span className={cn("ml-1.5 text-[10px]", active ? "opacity-70" : "opacity-50")}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                <ProjectCard
                  project={project}
                  index={PROJECTS.indexOf(project)}
                  onOpen={() => setOpenId(project.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Dialog open={!!openProject} onOpenChange={(open) => !open && setOpenId(null)}>
        {openProject && <ProjectDialog project={openProject} />}
      </Dialog>
    </section>
  );
}
