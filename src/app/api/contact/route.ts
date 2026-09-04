import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { buildEnquiryConfirmationEmail } from "@/lib/contact-emails";
import { contactSchema } from "@/lib/contact-schema";

const hits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function rateLimit(key: string) {
  const now = Date.now();
  const record = hits.get(key);

  if (!record || record.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (record.count >= MAX_HITS) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (!rateLimit(ip)) {
    return NextResponse.json(
      { message: "Too many submissions. Please email jayme@studiobaggio.ai directly." },
      { status: 429 }
    );
  }

  const parsed = contactSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json({ message: "Please check the form fields." }, { status: 400 });
  }

  if (parsed.data.companyUrl) {
    return NextResponse.json({ message: "Spam check failed." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "jayme@studiobaggio.ai";
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from) {
    return NextResponse.json(
      {
        message:
          "The message could not be sent. Email jayme@studiobaggio.ai directly."
      },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);
  const { name, email, business, website, biggestChallenge, alreadyTried, whyNow, successfulOutcome } = parsed.data;

  try {
    const result = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Studio Baggio enquiry - ${business}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company name: ${business}`,
        `Website: ${website || "Not supplied"}`,
        "",
        "What is the biggest challenge they are trying to solve right now?",
        biggestChallenge || "Not supplied",
        "",
        "What have they already tried?",
        alreadyTried || "Not supplied",
        "",
        "Why is now the right time to address this?",
        whyNow || "Not supplied",
        "",
        "What would success look like for their business 6 months from now?",
        successfulOutcome || "Not supplied"
      ].join("\n")
    });

    if (result.error) {
      return NextResponse.json(
        { message: result.error.message || "The message could not be sent. Email jayme@studiobaggio.ai directly." },
        { status: 500 }
      );
    }

    // Studio Baggio Business Tracker: the enquiry becomes a lead signal.
    // Fire-and-forget; a tracker failure never affects the enquiry itself.
    const trackerUrl = process.env.NEXT_PUBLIC_TRACKER_URL;
    const trackerKey = process.env.TRACKER_INGEST_KEY;
    if (trackerUrl && trackerKey) {
      void fetch(`${trackerUrl.replace(/\/$/, "")}/api/leads/ingest`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          source_key: trackerKey,
          email,
          name,
          firm_name: business,
          website: website || undefined,
          biggest_challenge: biggestChallenge || undefined,
          already_tried: alreadyTried || undefined,
          why_now: whyNow || undefined,
          successful_outcome: successfulOutcome || undefined
        })
      }).catch((err) => console.error("Business Tracker ingest failed", err));
    }

    const confirmationEmail = buildEnquiryConfirmationEmail(name);
    const confirmation = await resend.emails.send({
      from,
      to: email,
      replyTo: to,
      subject: "Studio Baggio enquiry received",
      html: confirmationEmail.html,
      text: confirmationEmail.text
    });

    if (confirmation.error) {
      console.error("Studio Baggio contact confirmation email failed", confirmation.error);
    }

    return NextResponse.json({
      ok: true,
      id: result.data?.id,
      confirmationId: confirmation.data?.id || null
    });
  } catch {
    return NextResponse.json(
      { message: "The message could not be sent. Email jayme@studiobaggio.ai directly." },
      { status: 500 }
    );
  }
}
