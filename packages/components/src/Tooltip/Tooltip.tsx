import { forwardRef } from "react";

import type { TooltipProps } from "./types";

const TooltipComponent = (
  { x, y, width = 200, height = 100, children, className = "" }: TooltipProps,
  ref: React.Ref<HTMLDivElement>
) => (
  <div
    ref={ref}
    className={`absolute bg-primary-surfaceBg p-2 rounded shadow text-primary-surfaceFg tooltip flex flex-col justify-center gap-2 z-50 ${className}`}
    style={{
      left: x - width / 2,
      top: y - (height + 8),
      width,
      height,
      transform: "translate(0, 0)",
    }}
  >
    {children}
  </div>
);

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  TooltipComponent
);
