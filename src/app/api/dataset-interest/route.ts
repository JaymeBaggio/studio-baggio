import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { datasetInterestSchema } from "@/lib/dataset-interest-schema";
import { buildEnquiryConfirmationEmail } from "@/lib/contact-emails";

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

  const parsed = datasetInterestSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message || "Please check the form fields.";
    return NextResponse.json({ message: first }, { status: 400 });
  }

  if (parsed.data.companyUrl) {
    return NextResponse.json({ message: "Spam check failed." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "jayme@studiobaggio.ai";
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from) {
    return NextResponse.json(
      { message: "That didn't send. Email jayme@studiobaggio.ai directly." },
      { status: 503 }
    );
  }

  const { email, firm, role, variant } = parsed.data;
  const domain = email.split("@")[1] ?? "";
  const firmLabel = firm || domain;
  const resend = new Resend(apiKey);

  try {
    const result = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Private dataset interest - ${firmLabel}`,
      text: [
        `Email: ${email}`,
        `Firm: ${firm || "Not supplied"}`,
        `Role: ${role || "Not supplied"}`,
        `Placement: ${variant === "inline" ? "beside the firm results" : "section under the masthead"}`,
        "Page: /research/uk-financial-advice-2026"
      ].join("\n")
    });

    if (result.error) {
      return NextResponse.json(
        { message: "That didn't send. Email jayme@studiobaggio.ai directly." },
        { status: 500 }
      );
    }

    // Studio Baggio Business Tracker: the registration becomes a lead signal.
    // Fire-and-forget; a tracker failure never affects the submission itself.
    const trackerUrl = process.env.NEXT_PUBLIC_TRACKER_URL;
    const trackerKey = process.env.TRACKER_INGEST_KEY;
    if (trackerUrl && trackerKey) {
      void fetch(`${trackerUrl.replace(/\/$/, "")}/api/leads/ingest`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          source_key: trackerKey,
          email,
          name: role || undefined,
          firm_name: firmLabel,
          website: `https://${domain}`,
          biggest_challenge: `Private dataset interest from the research page (${variant}).`,
          why_now: "Registered interest in the unpublished HNW dataset."
        })
      }).catch((err) => console.error("Business Tracker ingest failed", err));
    }

    // The enquirer gets the same confirmation the contact form sends.
    const confirmationEmail = buildEnquiryConfirmationEmail("", {
      first: "We have received your interest in the HNW and UHNW dataset.",
      second: "We will be in touch to arrange next steps."
    });
    const confirmation = await resend.emails.send({
      from,
      to: email,
      replyTo: to,
      subject: "Studio Baggio enquiry received",
      html: confirmationEmail.html,
      text: confirmationEmail.text
    });
    if (confirmation.error) {
      console.error("Private dataset confirmation email failed", confirmation.error);
    }

    return NextResponse.json({ ok: true, id: result.data?.id, confirmationId: confirmation.data?.id || null });
  } catch (error) {
    console.error("Private dataset interest failed", error);
    return NextResponse.json(
      { message: "That didn't send. Email jayme@studiobaggio.ai directly." },
      { status: 500 }
    );
  }
}
