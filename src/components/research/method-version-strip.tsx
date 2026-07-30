import { ArrowUpRight } from "lucide-react";
import type { MethodStripItem } from "./types";

export function MethodVersionStrip({ items }: { items: MethodStripItem[] }) {
  return (
    <aside className="research-method-strip" aria-labelledby="research-method-strip-title" data-research-method-strip>
      <div className="editorial-container">
        <div className="research-method-strip__intro" data-research-method-item>
          <p className="eyebrow">Read the evidence properly</p>
          <h2 id="research-method-strip-title">Method, disclosure and corrections</h2>
        </div>
        <nav aria-label="Research documentation">
          <ul>
            {items.slice(0, 5).map((item) => (
              <li key={item.href} data-research-method-item>
                <a href={item.href}>
                  <span>
                    <strong>{item.label}</strong>
                    <small>{item.detail}</small>
                  </span>
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
