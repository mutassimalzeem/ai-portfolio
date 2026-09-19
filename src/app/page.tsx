"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence } from "framer-motion";
import { Header } from "@/components/portfolio/header";
import { Hero } from "@/components/portfolio/hero";
import { Terminal } from "@/components/portfolio/terminal";
import { TechTicker } from "@/components/portfolio/tech-ticker";
import { About } from "@/components/portfolio/about";
import { Skills } from "@/components/portfolio/skills";
import { Projects } from "@/components/portfolio/projects";
import { Journey } from "@/components/portfolio/journey";
import { Contact } from "@/components/portfolio/contact";
import { Footer } from "@/components/portfolio/footer";
import { CommandPalette } from "@/components/portfolio/command-palette";
import {
  CustomCursor,
  NoiseOverlay,
  ScrollProgress,
  KonamiListener,
  useMedia,
} from "@/components/portfolio/effects";
import { BootIntro } from "@/components/portfolio/boot-intro";

const noopSubscribe = () => () => {};

function hasSeenBoot(): boolean {
  try {
    return sessionStorage.getItem("zeem-booted") === "1";
  } catch {
    return false;
  }
}

export default function Home() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  // null = decide from environment; explicit values come from replay/finish.
  const [override, setOverride] = useState<"boot" | "skip" | null>(null);
  const reducedMotion = useMedia("(prefers-reduced-motion: reduce)");
  const seenBoot = useSyncExternalStore(noopSubscribe, hasSeenBoot, () => false);

  const showBoot =
    override === "boot" || (override === null && !seenBoot && !reducedMotion);

  useEffect(() => {
    const replay = () => setOverride("boot");
    window.addEventListener("zeem:boot", replay);
    return () => window.removeEventListener("zeem:boot", replay);
  }, []);

  const finishBoot = () => {
    setOverride("skip");
    try {
      sessionStorage.setItem("zeem-booted", "1");
    } catch {
      /* private mode — boot again next visit, no harm */
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <CustomCursor />
      <NoiseOverlay />
      <ScrollProgress />
      <KonamiListener />

      <AnimatePresence>
        {showBoot && <BootIntro key="boot" onComplete={finishBoot} />}
      </AnimatePresence>

      {!showBoot && (
        <>
          <a
            href="#work"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
          >
            Skip to content
          </a>

          <Header onOpenPalette={() => setPaletteOpen(true)} />

          <main className="flex-1">
            <Hero />
            <TechTicker />

            {/* The console — the portfolio you can talk to */}
            <section id="console" className="section-anchor py-16 sm:py-20" aria-label="Interactive console">
              <div className="mx-auto max-w-6xl px-5 sm:px-8">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] font-medium tracking-wide text-safety">(00)</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    Console
                  </span>
                  <span className="h-px flex-1 bg-border" aria-hidden />
                  <span className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground sm:block">
                    Type <span className="text-foreground">help</span> to start
                  </span>
                </div>
                <div className="mt-6 max-w-3xl">
                  <Terminal />
                </div>
              </div>
            </section>

            <About />
            <Skills />
            <Projects />
            <Journey />
            <Contact />
          </main>

          <Footer />
          <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
        </>
      )}
    </div>
  );
}
