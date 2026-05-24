import Link from "next/link";
import { primaryCta } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/15">
      <div className="editorial-container grid gap-10 py-10 md:grid-cols-[1.1fr_1fr_1fr] md:py-14">
        <div>
          <p className="text-sm uppercase tracking-[0.08em]">Studio Baggio Ltd</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/55">
            Practical AI systems for expert-led businesses.
          </p>
        </div>
        <div className="text-sm leading-relaxed text-ink/60">
          <p>jayme@studiobaggio.ai</p>
          <Link className="focus-ring mt-2 inline-flex underline-offset-4 hover:underline" href="/privacy">
            Privacy
          </Link>
        </div>
        <div className="text-sm leading-relaxed text-ink/60 md:text-right">
          <Link className="focus-ring underline-offset-4 hover:underline" href={primaryCta.href}>
            {primaryCta.label}
          </Link>
          <p className="mt-2">© {new Date().getFullYear()} Studio Baggio Ltd</p>
        </div>
      </div>
    </footer>
  );
}
