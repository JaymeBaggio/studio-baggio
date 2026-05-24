"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      position="bottom-right"
      toastOptions={{
        style: {
          borderRadius: 0,
          border: "1px solid rgba(20,20,20,0.18)",
          background: "#F8F7F3",
          color: "#141414",
          fontFamily: "var(--font-aileron)"
        }
      }}
    />
  );
}
