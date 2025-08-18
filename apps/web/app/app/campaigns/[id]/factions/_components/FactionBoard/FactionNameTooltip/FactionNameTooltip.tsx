import { Tooltip } from "@repo/components";

import type { FactionNameTooltipProps } from "./types";

export const FactionNameTooltip = ({
  x,
  y,
  label = "",
}: FactionNameTooltipProps) => {
  return (
    <Tooltip x={x} y={y} className="pointer-events-none">
      {label}
    </Tooltip>
  );
};
