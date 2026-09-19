"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { NAV_SECTIONS, PROFILE } from "./data";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-secondary/30">
      {/* Giant wordmark — the editorial sign-off */}
      <div className="overflow-hidden border-b border-border" aria-hidden>
        <p className="type-display select-none whitespace-nowrap px-5 pt-10 pb-2 text-center text-[clamp(3rem,11vw,7.5rem)] leading-[0.9] text-foreground/[0.06] sm:px-8">
          M. AL ZEEM
        </p>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="#top" className="font-display text-lg font-bold tracking-tight">
            zeem<span className="text-safety">.</span>dev
          </Link>
          <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Designed and engineered by {PROFILE.shortName} — Dhaka, Bangladesh
          </p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Next.js · Tailwind · one terminal · one loud orange
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Footer">
          {NAV_SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {[
            { icon: Github, href: PROFILE.github, label: "GitHub" },
            { icon: Linkedin, href: PROFILE.linkedin, label: "LinkedIn" },
            { icon: Mail, href: `mailto:${PROFILE.email}`, label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="flex size-10 items-center justify-center rounded-none border border-border text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
            >
              <Icon className="size-4" aria-hidden />
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-border/60">
        <p className="mx-auto max-w-6xl px-5 py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground sm:px-8">
          © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
