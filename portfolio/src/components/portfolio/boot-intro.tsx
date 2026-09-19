"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const LINES = [
  { prefix: "zeem@dhaka:~$ ", text: "sudo ./boot --impress-mode", tone: "cmd" },
  { prefix: "[ ok ] ", text: "portfolio v3.0 — mutassim al shahriar zeem", tone: "ok" },
  { prefix: "[ ok ] ", text: "palette · paper + ink + safety orange", tone: "ok" },
  { prefix: "[ ok ] ", text: "type · bricolage + instrument serif + plex", tone: "ok" },
  { prefix: "[ ok ] ", text: "interactive shell · online", tone: "ok" },
  { prefix: "[ ok ] ", text: "dhaka, bangladesh · utc+6", tone: "ok" },
  { prefix: "[ ok ] ", text: "visitors to impress · you", tone: "ok" },
  { prefix: "zeem@dhaka:~$ ", text: "./render --first-sight", tone: "cmd" },
] as const;

const START_DELAY = 250;
const LINE_INTERVAL = 160;

/**
 * The site boots like a server: a fast log rolls in, the red disc pops,
 * then the whole overlay lifts to reveal the hero. Skippable with any
 * key or click; remembered per browser session.
 */
export function BootIntro({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [disc, setDisc] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timers: number[] = [];

    LINES.forEach((_, i) => {
      timers.push(
        window.setTimeout(() => setCount(i + 1), START_DELAY + i * LINE_INTERVAL)
      );
    });
    const discAt = START_DELAY + LINES.length * LINE_INTERVAL + 140;
    timers.push(window.setTimeout(() => setDisc(true), discAt));
    timers.push(window.setTimeout(() => onCompleteRef.current(), discAt + 850));

    const skip = () => onCompleteRef.current();
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);

    return () => {
      document.body.style.overflow = "";
      timers.forEach((t) => window.clearTimeout(t));
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, []);

  return (
    <motion.div
      role="dialog"
      aria-label="Loading intro — press any key to skip"
      exit={{ opacity: 0, y: -28, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-[#141310] px-6"
    >
      <div className="w-full max-w-md font-mono text-[13px] leading-7 sm:text-sm">
        {LINES.slice(0, count).map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.18 }}
          >
            <span
              className={
                line.tone === "cmd"
                  ? "text-white/90"
                  : "text-[#ff5a1f]"
              }
            >
              {line.prefix}
            </span>
            <span className="text-white/70">{line.text}</span>
          </motion.p>
        ))}

        {disc ? (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 16 }}
            className="mt-6 flex items-center gap-3"
          >
            <span className="block size-4 rounded-[3px] bg-[#ff5a1f]" aria-hidden />
            <span className="text-xs text-white/80">ready.</span>
          </motion.div>
        ) : (
          <span
            className="mt-1 inline-block h-4 w-2 translate-y-[3px] animate-blink bg-[#ff5a1f] align-middle"
            aria-hidden
          />
        )}
      </div>

      <p className="absolute bottom-8 font-mono text-[11px] text-white/35">
        press any key to skip
      </p>
    </motion.div>
  );
}
