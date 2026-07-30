import { Download } from "lucide-react";
import type { ResearchDownload } from "./types";

export function ResearchDownloads({
  downloads,
  error
}: {
  downloads: ResearchDownload[];
  error?: string;
}) {
  return (
    <section className="research-downloads" aria-labelledby="research-downloads-title">
      <div className="research-downloads__heading">
        <p className="eyebrow">Public evidence files</p>
        <h2 id="research-downloads-title">Download the processed dataset</h2>
        <p>These files contain reviewed, processed evidence only. Raw model answers remain private.</p>
      </div>

      {error ? (
        <p className="research-downloads__error" role="alert">
          <strong>Downloads are temporarily unavailable.</strong> {error}
        </p>
      ) : (
        <ul>
          {downloads.map((download) => (
            <li key={download.href}>
              <a className="research-download-link" href={download.href} download>
                <span>
                  <strong>{download.label}</strong>
                  <small>
                    {download.format} · {download.version} · Updated {download.lastUpdated}
                  </small>
                  {download.description ? <small>{download.description}</small> : null}
                </span>
                <Download aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
