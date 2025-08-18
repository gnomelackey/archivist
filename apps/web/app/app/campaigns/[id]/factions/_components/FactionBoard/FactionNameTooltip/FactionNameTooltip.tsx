import { useRef, useLayoutEffect, useState } from "react";
import { Tooltip } from "@repo/components";

import type { FactionNameTooltipProps } from "./types";

const OFF_SCREEN_POSITION = -9999;

export const FactionNameTooltip = ({
  x,
  y,
  label = "",
}: FactionNameTooltipProps) => {
  const measureRef = useRef<HTMLDivElement>(null);

  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useLayoutEffect(() => {
    if (measureRef.current && label) {
      const rect = measureRef.current.getBoundingClientRect();
      setDimensions({
        width: rect.width,
        height: rect.height,
      });
    }
  }, [label, x, y]);

  if (!label) return null;

  return (
    <>
      <div
        ref={measureRef}
        className="absolute bg-gray-200 p-2 rounded shadow text-palette-300 flex flex-col gap-2 whitespace-nowrap"
        style={{
          left: OFF_SCREEN_POSITION,
          top: OFF_SCREEN_POSITION,
          visibility: "hidden",
          pointerEvents: "none",
        }}
      >
        {label}
      </div>
      {dimensions ? (
        <Tooltip
          x={x}
          y={y}
          width={dimensions.width}
          height={dimensions.height}
          className="pointer-events-none"
        >
          {label}
        </Tooltip>
      ) : null}
    </>
  );
};
