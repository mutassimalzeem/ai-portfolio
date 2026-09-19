"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { PROFILE, PROJECTS, SKILL_GROUPS } from "./data";

type Line = { kind: "cmd" | "out" | "link"; text: string; href?: string };

const BOOT: Line[] = [
  { kind: "out", text: "zeem-sh v2.0 — the portfolio shell" },
  { kind: "out", text: "Type `help` to see what I can do." },
];

function buildHelp(): Line[] {
  return [
    { kind: "out", text: "Available commands:" },
    { kind: "out", text: "  whoami      who is this guy" },
    { kind: "out", text: "  about       short bio" },
    { kind: "out", text: "  skills      what I work with" },
    { kind: "out", text: "  projects    things I've built" },
    { kind: "out", text: "  contact     how to reach me" },
    { kind: "out", text: "  resume      open my résumé (PDF)" },
    { kind: "out", text: "  social      GitHub & LinkedIn" },
    { kind: "out", text: "  theme       toggle dark / light" },
    { kind: "out", text: "  ping       check availability" },
    { kind: "out", text: "  clear       wipe the screen" },
    { kind: "out", text: "  (try `sudo hire-zeem` if you're feeling bold)" },
  ];
}

function runCommand(raw: string, toggleTheme: () => void): Line[] {
  const input = raw.trim();
  const [cmd, ...args] = input.split(/\s+/);
  const arg = args.join(" ").toLowerCase();

  switch (cmd.toLowerCase()) {
    case "":
      return [];
    case "help":
      return buildHelp();
    case "whoami":
      return [
        { kind: "out", text: `${PROFILE.name} — ${PROFILE.role}` },
        { kind: "out", text: `${PROFILE.location} (${PROFILE.timezone}) · ${PROFILE.availability.toLowerCase()}` },
      ];
    case "about":
      return PROFILE.about.map((p) => ({ kind: "out" as const, text: p }));
    case "skills":
      return SKILL_GROUPS.flatMap((g) => [
        { kind: "out" as const, text: `${g.title}:` },
        { kind: "out" as const, text: `  ${g.skills.join(" · ")}` },
      ]);
    case "projects":
    case "ls":
      return [
        { kind: "out", text: "Projects on GitHub:" },
        ...PROJECTS.filter((p) => p.repo).map((p) => ({
          kind: "link" as const,
          text: `  ${p.name} — ${p.tagline}`,
          href: p.repo,
        })),
        { kind: "out", text: `Zyra (flagship, in active development — launch soon)` },
      ];
    case "contact":
    case "cat":
      if (cmd.toLowerCase() === "cat") {
        if (arg.includes("contact")) {
          return [
            { kind: "out", text: `email: ${PROFILE.email}` },
            { kind: "out", text: `phone:  ${PROFILE.phone}` },
            { kind: "out", text: `where:  ${PROFILE.location}` },
          ];
        }
        return [{ kind: "out", text: "cat: try `cat contact.txt`" }];
      }
      return [
        { kind: "out", text: `email  → ${PROFILE.email}` },
        { kind: "out", text: `phone  → ${PROFILE.phone}` },
        { kind: "link", text: "github → github.com/mutassimalzeem", href: PROFILE.github },
        { kind: "link", text: "linkedin → linkedin.com/in/mutassimalzeem", href: PROFILE.linkedin },
      ];
    case "resume":
      window.open(PROFILE.resume, "_blank", "noopener");
      return [{ kind: "out", text: "Opening résumé in a new tab…" }];
    case "social":
      return [
        { kind: "link", text: "github   github.com/mutassimalzeem", href: PROFILE.github },
        { kind: "link", text: "linkedin linkedin.com/in/mutassimalzeem", href: PROFILE.linkedin },
      ];
    case "theme":
      toggleTheme();
      return [{ kind: "out", text: "Theme flipped. Nice." }];
    case "ping":
      return [
        { kind: "out", text: "PING zeem.dhaka.bd: 56 bytes" },
        { kind: "out", text: "time=0.042ms — he replies fast, usually within a day." },
      ];
    case "pwd":
      return [{ kind: "out", text: "/home/zeem/dhaka/bangladesh" }];
    case "echo":
      return [{ kind: "out", text: args.join(" ") }];
    case "sudo":
      if (arg === "hire-zeem" || arg === "hire zeem") {
        return [
          { kind: "out", text: "[sudo] permission granted ✔" },
          { kind: "out", text: "Drafting offer letter… just email him:" },
          { kind: "link", text: `  ${PROFILE.email}`, href: `mailto:${PROFILE.email}` },
        ];
      }
      return [{ kind: "out", text: "zeem is not in the sudoers file. This incident will be reported." }];
    case "boot":
    case "reboot":
      window.dispatchEvent(new CustomEvent("zeem:boot"));
      return [{ kind: "out", text: "Rebooting…" }];
    case "exit":
      return [{ kind: "out", text: "nice try — this tab is yours now." }];
    case "konami":
      return [{ kind: "out", text: "↑ ↑ ↓ ↓ ← → ← → B A — you know what to do." }];
    case "neofetch":
      return [
        { kind: "out", text: "        zeem@dhaka" },
        { kind: "out", text: "  ●     ─────────────" },
        { kind: "out", text: " /|\\    role: Backend & AI Engineer" },
        { kind: "out", text: " / \\    stack: Python · FastAPI · PostgreSQL" },
        { kind: "out", text: "        ml: PyTorch · scikit-learn · LangChain" },
        { kind: "out", text: "        uptime: 2+ years shipping" },
        { kind: "out", text: "        shell: zsh (obviously)" },
      ];
    case "clear":
      return [{ kind: "out", text: "__CLEAR__" }];
    default:
      return [
        { kind: "out", text: `command not found: ${cmd}` },
        { kind: "out", text: "try `help` — or `sudo hire-zeem`" },
      ];
  }
}

export function Terminal() {
  const [lines, setLines] = useState<Line[]>(BOOT);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { setTheme, resolvedTheme, theme } = useTheme();

  const toggleTheme = useCallback(() => {
    const current = theme === "system" ? resolvedTheme : theme;
    setTheme(current === "dark" ? "light" : "dark");
  }, [theme, resolvedTheme, setTheme]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const submit = () => {
    const raw = input;
    setInput("");
    if (raw.trim()) {
      setHistory((h) => [...h, raw]);
    }
    setHistoryIdx(-1);
    const output = runCommand(raw, toggleTheme);
    if (output.some((l) => l.text === "__CLEAR__")) {
      setLines([]);
      return;
    }
    setLines((prev) => [
      ...prev,
      { kind: "cmd", text: raw },
      ...output,
    ]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const next = historyIdx < 0 ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(next);
      setInput(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx < 0) return;
      const next = historyIdx + 1;
      if (next >= history.length) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        setHistoryIdx(next);
        setInput(history[next]);
      }
    } else if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <div
      className="overflow-hidden rounded-md border border-foreground/20 bg-[#141310] shadow-2xl shadow-foreground/10"
      role="application"
      aria-label="Interactive terminal — try typing 'help'"
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2.5">
        <span className="size-3 rounded-full bg-[#ff5f57]" aria-hidden />
        <span className="size-3 rounded-full bg-[#febc2e]" aria-hidden />
        <span className="size-3 rounded-full bg-[#28c840]" aria-hidden />
        <span className="ml-2 font-mono text-xs text-white/50">zeem@dhaka: ~</span>
      </div>

      <div
        ref={scrollRef}
        className="term-scroll h-80 cursor-text overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed text-[#e9e6dd] sm:h-[22rem]"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, i) => {
          if (line.kind === "cmd") {
            return (
              <p key={i} className="text-white">
                <span className="text-[#ff5a1f]">❯</span>{" "}
                <span className="text-white/50">~</span>{" "}
                <span className="text-white/90">{line.text}</span>
              </p>
            );
          }
          if (line.kind === "link" && line.href) {
            return (
              <a
                key={i}
                href={line.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[#ff7a47] underline decoration-white/20 underline-offset-2 hover:decoration-current"
              >
                {line.text}
              </a>
            );
          }
          return (
            <p key={i} className="whitespace-pre-wrap text-white/70">
              {line.text}
            </p>
          );
        })}

        <div className="mt-1 flex items-center gap-2">
          <span className="text-[#ff5a1f]">❯</span>
          <span className="text-white/50">~</span>
          <div className="relative flex-1">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              className="w-full bg-transparent text-white caret-transparent outline-none"
              aria-label="Terminal input"
              autoComplete="off"
              spellCheck={false}
            />
            <span className="pointer-events-none absolute left-0 top-0 text-white">
              {input}
              <span className="ml-px inline-block h-4 w-2 translate-y-[3px] animate-blink bg-[#ff5a1f]" />
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-white/5 px-4 py-2">
        <p className="font-mono text-[11px] text-white/55">
          Try: help · projects · boot · sudo hire-zeem · ↑ history
        </p>
      </div>
    </div>
  );
}
