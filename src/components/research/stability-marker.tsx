import { CircleCheck, CircleDashed, CircleHelp, CircleMinus } from "lucide-react";
import type { StabilityState } from "./types";

const stabilityLabels: Record<StabilityState, string> = {
  "stable-present": "Stable present",
  variable: "Variable",
  "not-observed": "Not observed",
  "not-measured": "Not measured"
};

const stabilityIcons = {
  "stable-present": CircleCheck,
  variable: CircleDashed,
  "not-observed": CircleMinus,
  "not-measured": CircleHelp
} satisfies Record<StabilityState, typeof CircleCheck>;

export function StabilityMarker({
  state,
  compact = false
}: {
  state: StabilityState;
  compact?: boolean;
}) {
  const Icon = stabilityIcons[state];

  return (
    <span className={`research-stability research-stability--${state}`}>
      <Icon aria-hidden="true" />
      <span className={compact ? "sr-only" : undefined}>{stabilityLabels[state]}</span>
    </span>
  );
}

export { stabilityLabels };
