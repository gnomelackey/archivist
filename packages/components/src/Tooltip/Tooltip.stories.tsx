import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useRef, useState } from "react";

import { Tooltip } from "./Tooltip";
import { TooltipProps } from "./types";

const StoryBoardPlayground = ({ children, ...args }: TooltipProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: -1, y: -1 });

  const show = tooltipPos.x !== -1 && tooltipPos.y !== -1;

  useEffect(() => {
    if (ref?.current && containerRef?.current) {
      const buttonRect = ref.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      setTooltipPos({
        x: buttonRect.left - containerRect.left + buttonRect.width / 2,
        y: buttonRect.top - containerRect.top - 4,
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div
        ref={ref}
        className="bg-primary-600 text-primary-fg px-6 py-3 rounded transition-colors select-none"
      >
        Hover me to see the tooltip
      </div>
      {show ? (
        <Tooltip {...args} x={tooltipPos.x} y={tooltipPos.y}>
          {children}
        </Tooltip>
      ) : null}
    </div>
  );
};

const meta = {
  component: Tooltip,
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center min-h-screen">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    x: 200,
    y: 200,
    children: (
      <div className="text-sm">
        <strong className="w-25">Tooltip Content</strong>
        <p className="w-50">This is an example tooltip that appears on hover!</p>
      </div>
    ),
  },
  render: (args) => {
    return <StoryBoardPlayground {...args} />;
  },
};
