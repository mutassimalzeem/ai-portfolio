"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  ArrowDown,
  Copy,
  FileText,
  Gamepad2,
  Github,
  Linkedin,
  Moon,
  RotateCcw,
  Sun,
  User,
  Wrench,
  Briefcase,
  Route,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { NAV_SECTIONS, PROFILE } from "./data";

const SECTION_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  about: User,
  skills: Wrench,
  work: Briefcase,
  journey: Route,
  contact: MessageSquare,
};

export function CommandPalette({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const { toast } = useToast();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  const goTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      toast({ title: "Email copied", description: PROFILE.email });
    } catch {
      toast({ title: "Copy failed", description: PROFILE.email, variant: "destructive" });
    }
    setOpen(false);
  };

  const toggleTheme = () => {
    const current = theme === "system" ? resolvedTheme : theme;
    setTheme(current === "dark" ? "light" : "dark");
    setOpen(false);
  };

  const openExternal = (url: string) => {
    window.open(url, "_blank", "noopener");
    setOpen(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen} className="rounded-md">
      <CommandInput placeholder="Type a command or search…" />
      <CommandList className="term-scroll">
        <CommandEmpty>Nothing matched — try &quot;work&quot; or &quot;theme&quot;.</CommandEmpty>

        <CommandGroup heading="Navigate">
          {NAV_SECTIONS.map(({ id, label }) => {
            const Icon = SECTION_ICONS[id] ?? ArrowDown;
            return (
              <CommandItem key={id} onSelect={() => goTo(id)}>
                <Icon className="size-4" />
                {label}
              </CommandItem>
            );
          })}
          <CommandItem onSelect={() => goTo("top")}>
            <ArrowDown className="size-4" />
            Back to top
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem onSelect={copyEmail}>
            <Copy className="size-4" />
            Copy email address
          </CommandItem>
          <CommandItem onSelect={toggleTheme}>
            {theme === "light" || (theme === "system" && resolvedTheme === "light") ? (
              <Moon className="size-4" />
            ) : (
              <Sun className="size-4" />
            )}
            Toggle theme
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Links">
          <CommandItem onSelect={() => openExternal(PROFILE.resume)}>
            <FileText className="size-4" />
            Open résumé (PDF)
          </CommandItem>
          <CommandItem onSelect={() => openExternal(PROFILE.github)}>
            <Github className="size-4" />
            GitHub profile
          </CommandItem>
          <CommandItem onSelect={() => openExternal(PROFILE.linkedin)}>
            <Linkedin className="size-4" />
            LinkedIn profile
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Fun">
          <CommandItem
            onSelect={() => {
              setOpen(false);
              window.dispatchEvent(new CustomEvent("zeem:boot"));
            }}
          >
            <RotateCcw className="size-4" />
            Replay the boot intro
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setOpen(false);
              toast({
                title: "Cheat code detected",
                description: "↑ ↑ ↓ ↓ ← → ← → B A",
              });
            }}
          >
            <Gamepad2 className="size-4" />
            Reveal the cheat code
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setOpen(false);
              toast({
                title: "Nice try.",
                description: "Zyra launches soon — join the waitlist by email.",
              });
            }}
          >
            <Sparkles className="size-4" />
            Try the Zyra waitlist
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
