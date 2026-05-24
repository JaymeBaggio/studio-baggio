import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 180,
  height: 180
};
export const contentType = "image/png";

export default function AppleIcon() {
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
          alignItems: "center",
          justifyContent: "center",
          border: "2px solid #141414",
          fontFamily: "Arial, sans-serif"
        }}
      >
        <div style={{ fontSize: 48, lineHeight: 1 }}>SB</div>
        <div style={{ marginTop: 12, fontSize: 12, letterSpacing: 2 }}>AI</div>
      </div>
    ),
    size
  );
}
