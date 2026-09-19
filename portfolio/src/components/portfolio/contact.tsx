"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Check, Copy, Loader2, Mail, MapPin, Phone, Send, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PROFILE } from "./data";
import { SectionHeading } from "./section-heading";

const EMAIL_ENDPOINT = "/api/contact";

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({ title: "Copied", description: `${label} is on your clipboard.` });
      setTimeout(() => setCopied(false), 1600);
    } catch {
      toast({
        title: "Couldn't copy",
        description: `${text}`,
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={copy}
      aria-label={`Copy ${label}`}
      className="size-8 rounded-none"
    >
      {copied ? <Check className="size-3.5 text-safety" /> : <Copy className="size-3.5" />}
    </Button>
  );
}

export function Contact() {
  const reduceMotion = useReducedMotion();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = "Please tell me your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "That email doesn't look right";
    if (form.message.trim().length < 10) next.message = "Give me at least a sentence to work with";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSending(true);
    try {
      const res = await fetch(EMAIL_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong");
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      toast({
        title: "Message sent",
        description: "Thanks — I read everything and usually reply within a day.",
      });
    } catch (err) {
      toast({
        title: "Couldn't send that",
        description: err instanceof Error ? err.message : "Try email instead.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section-anchor py-20 sm:py-28" aria-label="Contact">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading index="05" kicker="Contact" title="Say" serif="hello." />
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mt-4 max-w-xl text-muted-foreground"
        >
          A project, a role, or just a technical question — the form lands in my inbox
          either way.
        </motion.p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <motion.form
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.12 }}
            onSubmit={submit}
            noValidate
            className="border border-border bg-card p-6 sm:p-8"
          >
            {sent && (
              <div className="mb-6 flex items-center gap-3 border border-safety/40 bg-safety/10 p-4 text-sm text-safety" role="status">
                <Check className="size-4 shrink-0" aria-hidden />
                <p>Sent. I&apos;ll get back to you within a day or two.</p>
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="name" className="font-mono text-[11px] uppercase tracking-[0.16em]">Name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={set("name")}
                  placeholder="Ada Lovelace"
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  className="rounded-none border-x-0 border-t-0 bg-transparent px-1 focus-visible:ring-0"
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="font-mono text-[11px] uppercase tracking-[0.16em]">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="ada@analytical.engine"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  className="rounded-none border-x-0 border-t-0 bg-transparent px-1 focus-visible:ring-0"
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>
            </div>

            <div className="mt-5 grid gap-2">
              <Label htmlFor="subject" className="font-mono text-[11px] uppercase tracking-[0.16em]">
                Subject <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="subject"
                value={form.subject}
                onChange={set("subject")}
                placeholder="Let's build something"
                className="rounded-none border-x-0 border-t-0 bg-transparent px-1 focus-visible:ring-0"
              />
            </div>

            <div className="mt-5 grid gap-2">
              <Label htmlFor="message" className="font-mono text-[11px] uppercase tracking-[0.16em]">Message</Label>
              <Textarea
                id="message"
                value={form.message}
                onChange={set("message")}
                placeholder="What are you working on?"
                rows={5}
                aria-invalid={!!errors.message}
                className="resize-none rounded-none border-x-0 border-t-0 bg-transparent px-1 focus-visible:ring-0"
              />
              {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={sending}
              className="mt-8 w-full rounded-none text-base font-semibold tracking-tight transition-colors duration-300 hover:bg-safety hover:text-white sm:w-auto sm:px-10"
            >
              {sending ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                  Sending
                </>
              ) : (
                <>
                  <Send className="size-4" aria-hidden />
                  Send message
                </>
              )}
            </Button>
          </motion.form>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="space-y-4"
          >
            {[
              {
                icon: Mail,
                label: "Email",
                value: PROFILE.email,
                href: `mailto:${PROFILE.email}`,
                copy: PROFILE.email,
              },
              {
                icon: Phone,
                label: "Phone",
                value: PROFILE.phone,
                href: `tel:${PROFILE.phoneHref}`,
                copy: PROFILE.phoneHref,
              },
              {
                icon: MapPin,
                label: "Based in",
                value: `${PROFILE.location} · ${PROFILE.timezone}`,
                href: undefined,
                copy: undefined,
              },
            ].map(({ icon: Icon, label, value, href, copy }) => (
              <div
                key={label}
                className="flex items-center gap-4 border border-border bg-card p-4 transition-colors duration-300 hover:border-foreground/40"
              >
                <span className="flex size-10 shrink-0 items-center justify-center border border-border text-safety">
                  <Icon className="size-4.5" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className="block truncate font-medium underline-offset-4 hover:underline"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="truncate font-medium">{value}</p>
                  )}
                </div>
                {copy && <CopyButton text={copy} label={label} />}
              </div>
            ))}

            <div className="flex gap-3 pt-2">
              <Button asChild variant="outline" className="flex-1 rounded-none">
                <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">
                  <Github className="size-4" aria-hidden />
                  GitHub
                </a>
              </Button>
              <Button asChild variant="outline" className="flex-1 rounded-none">
                <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="size-4" aria-hidden />
                  LinkedIn
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
