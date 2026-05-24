import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 32,
  height: 32
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#FFFFFF",
          color: "#141414",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #141414",
          fontSize: 13,
          fontFamily: "Arial, sans-serif",
          letterSpacing: 0
        }}
      >
        SB
      </div>
    ),
    size
  );
}
