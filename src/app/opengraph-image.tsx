import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Studio Baggio - practical AI systems for expert-led businesses.";
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
        <div style={{ fontSize: 56, lineHeight: 1.04, maxWidth: 1000 }}>
          We design and build practical AI systems that help your business become easier to find,
          faster, better informed, harder to compete with.
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
