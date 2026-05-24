import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section-pad pt-32">
      <div className="editorial-container">
        <p className="eyebrow">404</p>
        <h1 className="display-xl mt-6">Page not found.</h1>
        <Link className="focus-ring mt-10 inline-flex border border-ink px-5 py-3 text-sm uppercase tracking-[0.06em]" href="/">
          Return home
        </Link>
      </div>
    </section>
  );
}
