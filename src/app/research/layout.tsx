import type { ReactNode } from "react";
import { ResearchPageMotion } from "@/components/research/ResearchPageMotion";

export default function ResearchLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <ResearchPageMotion />
      {children}
    </>
  );
}
