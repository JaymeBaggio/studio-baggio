import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Studio Baggio - find where AI creates measurable value, then build the systems needed to deliver it.";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#FFFFFF",
          color: "#141414",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          fontFamily: "Arial, sans-serif"
        }}
      >
        <div style={{ fontSize: 18, letterSpacing: 3, textTransform: "uppercase" }}>
          Studio Baggio.ai
        </div>
        <div style={{ fontSize: 72, lineHeight: 1.02, maxWidth: 900 }}>
          Studio Baggio
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}>
          <span>Find where AI creates measurable value.</span>
          <span>AI strategy, systems and implementation.</span>
        </div>
      </div>
    ),
    size
  );
}
