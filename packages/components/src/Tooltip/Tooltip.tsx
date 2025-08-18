import type { TooltipProps } from "./types";

export const Tooltip = ({
  x,
  y,
  width = 200,
  height = 100,
  children,
  className = "",
}: TooltipProps) => (
  <div
    className={`absolute bg-gray-200 p-2 rounded shadow text-palette-300 tooltip flex flex-col gap-2 z-50 ${className}`}
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
