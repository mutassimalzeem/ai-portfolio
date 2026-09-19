import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const recipient = "mutassimalshahriar@gmail.com";

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
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { ok: false, error: "Contact delivery is not configured yet." },
        { status: 503 }
      );
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
        to: [recipient],
        reply_to: email,
        subject: subject || `Portfolio message from ${name}`,
        text: [`Name: ${name}`, `Email: ${email}`, "", message].join("\n"),
      }),
    });

    if (!emailResponse.ok) {
      console.error("[contact] email provider failed:", await emailResponse.text());
      return NextResponse.json(
        { ok: false, error: "The message could not be delivered. Please try again shortly." },
        { status: 502 }
      );
    }

    if (process.env.DATABASE_URL) {
      await db.contactMessage.create({
        data: { name, email, subject: subject || null, message },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] failed to save message:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong on my side — try email instead." },
      { status: 500 }
    );
  }
}
