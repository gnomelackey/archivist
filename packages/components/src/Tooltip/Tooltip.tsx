import { forwardRef, useLayoutEffect, useRef, useState } from "react";

import type { TooltipProps } from "./types";

const TooltipComponent = (
  { x, y, offset = 8, children, className = "" }: TooltipProps,
  ref: React.Ref<HTMLElement>
) => {
  const internalRef = useRef<HTMLDivElement>(null);

  const [adjustedPosition, setAdjustedPosition] = useState({ left: x, top: y });
  
  useLayoutEffect(() => {
    const element = internalRef.current;
    if (element) {
      const rect = element.getBoundingClientRect();
      const adjustedLeft = x - (rect.width / 2);
      const adjustedTop = y - rect.height - offset;
      
      setAdjustedPosition({ left: adjustedLeft, top: adjustedTop });
    }
  }, [x, y, offset, children]);

  return (
    <div
      ref={(el) => {
        internalRef.current = el;
        if (typeof ref === 'function') ref(el);
        else if (ref) ref.current = el;
      }}
      className={`tooltip absolute bg-primary-surfaceBg p-2 rounded shadow text-primary-surfaceFg flex flex-col justify-center gap-2 z-50 ${className}`}
      style={{
        left: adjustedPosition.left,
        top: adjustedPosition.top,
        width: "fit-content",
        height: "fit-content",
      }}
    >
      {children}
    </div>
  );
};

export const Tooltip = forwardRef<HTMLElement, TooltipProps>(
  TooltipComponent
);
