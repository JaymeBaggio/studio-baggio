import { ImageResponse } from "next/og";

export const alt = "UK Sports Law in AI Search 2026 — Studio Baggio Research";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7f7f7",
          color: "#111111",
          padding: "72px 78px",
          fontFamily: "Arial, sans-serif"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 22, letterSpacing: "0.16em", textTransform: "uppercase" }}>
            Studio Baggio Research
          </span>
          <span style={{ fontSize: 21, color: "#5f6368" }}>Benchmark · First edition</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
          <div style={{ display: "flex", fontSize: 90, lineHeight: 0.98, letterSpacing: "-0.055em" }}>
            UK Sports Law in<br />AI Search 2026<span style={{ color: "#2563eb" }}>.</span>
          </div>
          <div style={{ display: "flex", marginTop: 44, fontSize: 28, color: "#4b4f55" }}>
            90 questions · 810 answers · 9 sports-law specialisms
          </div>
        </div>
      </div>
    ),
    size
  );
}
