import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
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
          "Email is not configured yet. Add RESEND_API_KEY and CONTACT_FROM_EMAIL in Vercel, or email jayme@studiobaggio.ai directly."
      },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);
  const { name, email, business, website, improvement, aiOpportunity } = parsed.data;

  try {
    const result = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Studio Baggio enquiry - ${business}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Business / firm: ${business}`,
        `Website: ${website || "Not supplied"}`,
        "",
        "What are they trying to improve?",
        improvement,
        "",
        "Where do they think AI could help?",
        aiOpportunity
      ].join("\n")
    });

    if (result.error) {
      return NextResponse.json(
        { message: result.error.message || "The message could not be sent. Email jayme@studiobaggio.ai directly." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, id: result.data?.id });
  } catch {
    return NextResponse.json(
      { message: "The message could not be sent. Email jayme@studiobaggio.ai directly." },
      { status: 500 }
    );
  }
}
