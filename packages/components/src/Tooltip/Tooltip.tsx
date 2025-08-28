import { forwardRef } from "react";

import type { TooltipProps } from "./types";

const TooltipComponent = (
  { x, y, offset = 8, children, className = "" }: TooltipProps,
  ref: React.Ref<HTMLDivElement>
) => (
  <div
    ref={ref}
    className={`absolute bg-primary-surfaceBg p-2 rounded shadow text-primary-surfaceFg tooltip flex flex-col justify-center gap-2 z-50 ${className}`}
    style={{
      left: x,
      top: y,
      width: "fit-content",
      height: "fit-content",
      transform: `translate(-50%, calc(-100% - ${offset}px))`,
    }}
  >
    {children}
  </div>
);

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  TooltipComponent
);
