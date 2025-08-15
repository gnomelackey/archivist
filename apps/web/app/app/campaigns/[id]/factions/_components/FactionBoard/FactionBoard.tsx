"use client";

import { useState, useRef, useEffect, useCallback } from "react";

import Styles from './FactionBoard.module.css';
import type { Point, Rectangle } from "./types";

type ToolTipProps = { x: number; y: number; id: string };

const Tooltip = ({ x, y, id }: ToolTipProps) => (
  <div
    className={`absolute bg-gray-200 p-2 rounded shadow text-palette-300 pointer-events-none ${Styles.tooltip}`}
    style={{
      left: x - 100,
      top: y - 100,
      width: 200,
      height: 100,
      transform: "translate(0, 0)",
    }}
  >
    Overlap: {id}
  </div>
);

export const FactionBoard = () => {
  const [rectangles, setRectangles] = useState<Array<Rectangle>>([]);
  const [tooltips, setTooltips] = useState<Array<ToolTipProps>>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [currentRect, setCurrentRect] = useState<Rectangle | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setStartPoint({ x, y });
    setIsDrawing(true);
    setCurrentRect({
      id: `temp-${Date.now()}`,
      x,
      y,
      width: 0,
      height: 0,
      color: "#ff6b6b",
    });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPoint) return;

    const canvas = canvasRef.current;

    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const currentX = event.clientX - rect.left;
    const currentY = event.clientY - rect.top;

    const x = Math.min(startPoint.x, currentX);
    const y = Math.min(startPoint.y, currentY);
    const width = Math.abs(currentX - startPoint.x);
    const height = Math.abs(currentY - startPoint.y);

    setCurrentRect({
      id: `temp-${Date.now()}`,
      x,
      y,
      width,
      height,
      color: "#ff6b6b",
    });
  };

  const handleMouseUp = useCallback(() => {
    const { width = 0, height = 0 } = currentRect || {};

    const isTooSmall = width < 10 || height < 10;

    if (!isDrawing || !currentRect || isTooSmall) {
      setIsDrawing(false);
      setStartPoint(null);
      setCurrentRect(null);
      return;
    }

    const newRect: Rectangle = {
      ...currentRect,
      id: `rect-${Date.now()}`,
      color: "#3498db",
    };

    const newTooltips = rectangles.reduce<Array<ToolTipProps>>(
      (acc, rectangle) => {
        const oldRectRight = rectangle.x + rectangle.width;
        const newRectRight = newRect.x + newRect.width;
        const oldRectBottom = rectangle.y + rectangle.height;
        const newRectBottom = newRect.y + newRect.height;

        // Check if rectangles overlap
        if (
          rectangle.x < newRectRight &&
          oldRectRight > newRect.x &&
          rectangle.y < newRectBottom &&
          oldRectBottom > newRect.y
        ) {
          // Calculate overlap area boundaries
          const overlapLeft = Math.max(rectangle.x, newRect.x);
          const overlapTop = Math.max(rectangle.y, newRect.y);
          const overlapRight = Math.min(oldRectRight, newRectRight);
          const overlapBottom = Math.min(oldRectBottom, newRectBottom);

          const overlapWidth = overlapRight - overlapLeft;
          const overlapHeight = overlapBottom - overlapTop;

          if (overlapWidth <= 0 || overlapHeight <= 0) return acc;

          // Calculate center point of overlap area
          const overlapCenterX = overlapLeft + overlapWidth / 2;
          const overlapCenterY = overlapTop + overlapHeight / 2;

          return [
            ...acc,
            {
              id: `tooltip-${rectangle.id}-${newRect.id}`,
              x: overlapCenterX,
              y: overlapCenterY,
            },
          ];
        }

        return acc;
      },
      []
    );

    setRectangles((prev) => [...prev, newRect]);
    setTooltips((prev) => [...prev, ...newTooltips]);
    setIsDrawing(false);
    setStartPoint(null);
    setCurrentRect(null);
  }, [currentRect, isDrawing, rectangles]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    rectangles.forEach((rect) => {
      ctx.fillStyle = rect.color + "B3";
      ctx.strokeStyle = rect.color;
      ctx.lineWidth = 2;
      ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
      ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
    });

    const { height = 0, width = 0 } = currentRect || {};
    const hasSize = currentRect && width > 0 && height > 0;

    if (isDrawing && hasSize) {
      ctx.fillStyle = currentRect.color + "4D";
      ctx.strokeStyle = currentRect.color;
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.fillRect(
        currentRect.x,
        currentRect.y,
        currentRect.width,
        currentRect.height
      );
      ctx.strokeRect(
        currentRect.x,
        currentRect.y,
        currentRect.width,
        currentRect.height
      );
      ctx.setLineDash([]);
    }
  }, [rectangles, currentRect, isDrawing, tooltips]);

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        width={window.innerWidth - 100}
        height={window.innerHeight - 200}
        className="block bg-gray-50 cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      {tooltips.map((tooltip) => (
        <Tooltip key={tooltip.id} x={tooltip.x} y={tooltip.y} id={tooltip.id} />
      ))}
    </div>
  );
};
