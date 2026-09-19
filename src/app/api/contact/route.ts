import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const recipient = "mutassimalshahriar@gmail.com";

function createMailto(name: string, email: string, subject: string | undefined, message: string) {
  const body = [`From: ${name} <${email}>`, "", message].join("\n");
  const params = new URLSearchParams({ subject: subject || "Portfolio contact", body });
  return `mailto:${recipient}?${params.toString()}`;
}

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please tell me your name").max(80),
  email: z.string().trim().email("That email doesn't look right").max(120),
  subject: z.string().trim().max(120).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Give me at least a sentence to work with")
    .max(2000),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return NextResponse.json(
        { ok: false, error: first?.message ?? "Invalid submission" },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = parsed.data;

    if (!process.env.DATABASE_URL) {
      return NextResponse.json({
        ok: true,
        fallback: "mailto",
        href: createMailto(name, email, subject, message),
      });
    }

    await db.contactMessage.create({
      data: {
        name,
        email,
        subject: subject || null,
        message,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] failed to save message:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong on my side — try email instead." },
      { status: 500 }
    );
  }
}
