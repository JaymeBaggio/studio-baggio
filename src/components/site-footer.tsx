import Link from "next/link";
import { PreferredSourceLink } from "@/components/preferred-source-link";
import { footer, introDownload, primaryCta } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/15">
      <div className="editorial-container grid gap-10 py-10 md:grid-cols-[1.1fr_1fr_1fr] md:py-14">
        <div>
          <p className="text-sm uppercase tracking-[0.08em]">{footer.company}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/55">
            {footer.summary}
          </p>
        </div>
        <div className="text-sm leading-relaxed text-ink/60">
          <p>{footer.email}</p>
          {footer.productLinks?.map((link) =>
            link.href.startsWith("http") ? (
              <a
                key={link.href}
                className="focus-ring mt-2 block underline-offset-4 hover:underline"
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                className="focus-ring mt-2 block underline-offset-4 hover:underline"
                href={link.href}
              >
                {link.label}
              </Link>
            )
          )}
          <a
            className="focus-ring mt-2 block underline-offset-4 hover:underline"
            href={introDownload.href}
            download
          >
            {introDownload.footerLabel}
          </a>
          <Link className="focus-ring mt-2 inline-flex underline-offset-4 hover:underline" href="/privacy">
            {footer.privacyLabel}
          </Link>
          <Link
            className="focus-ring mt-2 block underline-offset-4 hover:underline"
            href="/research/data-usage"
          >
            Research data usage
          </Link>
          <PreferredSourceLink className="focus-ring mt-2 block text-left underline-offset-4 hover:underline" />
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
