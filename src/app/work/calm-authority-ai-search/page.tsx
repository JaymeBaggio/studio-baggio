import Image from "next/image";
import Link from "next/link";
import { calmAuthorityProof as proof } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: "Calm Authority: AI-search results", description: "Results from three financial-adviser comparison guides optimised for AI search.", path: proof.href });

const results = [
 ["Fidelius", "2", "16", "+700%"], ["Boolers", "2", "10", "+400%"],
 ["Attivo", "2", "5", "+150%"], ["Amber River", "19", "34", "+79%"],
 ["Acumen", "0", "12", "12 new"]
];

export default function CalmAuthoritySearchCase() {
 return <main className="editorial-container calm-case max-w-5xl">
  <Image src="/assets/logos/calm-authority.png" alt="Calm Authority" width={180} height={66} className="sv-calm-logo" />
  <h1>Calm Authority: AI-search results</h1>
  <div className="case-intro">
   <p>{proof.context} {proof.result} <strong className="font-semibold text-[color:var(--sb-accent-blue)]">{proof.highlight}</strong></p>
   <p>{proof.shortlist}</p>
   <p>Within 30 days, Calm Authority’s guides were the sixth most-cited source across the full study.</p>
  </div>
  <h2>Shortlist appearances before and after publication</h2>
  <table><caption className="sr-only">Selected firms appearing in AI-generated adviser shortlists before and after the guides were published</caption><thead><tr>{["Firm", "Before", "After", "Increase"].map(label => <th scope="col" key={label}>{label}</th>)}</tr></thead>
   <tbody>{results.map(([firm,before,after,increase]) => <tr key={firm}><th scope="row" className="!text-base !normal-case !text-ink">{firm}</th><td>{before}</td><td>{after}</td><td className="font-semibold text-[color:var(--sb-accent-blue)]">{increase}</td></tr>)}</tbody>
  </table>
  <p className="case-note">Firm appearances across equivalent 225-answer studies. Selected examples; observed changes rather than an isolated measure of the guides’ effect.</p>
  <div className="mt-8 flex flex-wrap gap-6 text-sm text-[color:var(--sb-accent-blue)]">
   <a href="https://www.calmauthority.ai/best/financial-advisers-uk">View the published guide →</a>
   <Link href="/services">Back to services →</Link>
  </div>
 </main>;
}
