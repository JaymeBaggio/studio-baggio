"use client";

import { useEffect } from "react";
import { startPostHog } from "@/lib/posthog";

export function PostHogInit() {
  useEffect(() => {
    startPostHog();
  }, []);

  return null;
}
