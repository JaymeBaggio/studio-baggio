import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Studio Baggio - Turn AI into a commercial advantage.";
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
        <div style={{ fontSize: 112, lineHeight: 0.9, maxWidth: 1000 }}>
          Turn AI into a commercial advantage.
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}>
          <span>Practical AI systems</span>
          <span>Visibility. Intelligence. Leads.</span>
        </div>
      </div>
    ),
    size
  );
}
