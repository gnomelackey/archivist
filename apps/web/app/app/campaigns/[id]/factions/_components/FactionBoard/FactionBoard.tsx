"use client";

import { useState, useRef, useEffect, useCallback } from "react";

import Chance from "chance";

import { FactionTooltip, type FactionToolTipProps } from "./FactionTooltip";
import type { Point, Rectangle } from "./types";
import { NAMES, RACES } from "./constants";
import { getContrastTextColor, getUniqueRandomColor } from "./utils";
import { FactionFormSideBar } from "./FactionSidebar";

const chance = new Chance();

export const FactionBoard = () => {
  const [rectangles, setRectangles] = useState<Array<Rectangle>>([]);
  const [tooltips, setTooltips] = useState<Array<FactionToolTipProps>>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [currentRect, setCurrentRect] = useState<Rectangle | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (event.target !== canvasRef.current) return;

    const canvas = canvasRef.current;

    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const id = `temp-${Date.now()}`;

    setIsDrawing(true);
    setStartPoint({ x, y });
    setCurrentRect({ id, x, y, width: 0, height: 0, color: "#ff6b6b" });
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
    const id = `temp-${Date.now()}`;

    setCurrentRect({ id, x, y, width, height, color: "#ff6b6b" });
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

    const usedColors = rectangles.map((rect) => rect.color);

    const newRect: Rectangle = {
      ...currentRect,
      id: `rect-${Date.now()}`,
      name: NAMES[chance.integer({ min: 0, max: NAMES.length - 1 })],
      race: RACES[chance.integer({ min: 0, max: RACES.length - 1 })],
      color: getUniqueRandomColor(usedColors),
    };

    const newTooltips = rectangles.reduce<Array<FactionToolTipProps>>(
      (acc, rectangle) => {
        const oldRectRight = rectangle.x + rectangle.width;
        const newRectRight = newRect.x + newRect.width;
        const oldRectBottom = rectangle.y + rectangle.height;
        const newRectBottom = newRect.y + newRect.height;

        if (
          rectangle.x < newRectRight &&
          oldRectRight > newRect.x &&
          rectangle.y < newRectBottom &&
          oldRectBottom > newRect.y
        ) {
          const overlapLeft = Math.max(rectangle.x, newRect.x);
          const overlapTop = Math.max(rectangle.y, newRect.y);
          const overlapRight = Math.min(oldRectRight, newRectRight);
          const overlapBottom = Math.min(oldRectBottom, newRectBottom);

          const overlapWidth = overlapRight - overlapLeft;
          const overlapHeight = overlapBottom - overlapTop;

          if (overlapWidth <= 0 || overlapHeight <= 0) return acc;

          const overlapCenterX = overlapLeft + overlapWidth / 2;
          const overlapCenterY = overlapTop + overlapHeight / 2;

          return [
            ...acc,
            {
              id: `tooltip-${rectangle.id}-${newRect.id}`,
              x: overlapCenterX,
              y: overlapCenterY,
              onClick: (id: string, relationship: "conflict" | "alliance") => {
                console.log(id, relationship);
                setTooltips((prev) => prev.filter((t) => t.id !== id));
              },
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
      const borderColor = rect.color + "FF";
      const fillColor = rect.color + "40";

      ctx.fillStyle = fillColor;
      ctx.fillRect(rect.x, rect.y, rect.width, rect.height);

      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 2;
      ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);

      ctx.fillStyle = borderColor;
      ctx.fillRect(rect.x - 1, rect.y - 26, rect.width + 2, 25);

      ctx.font = "16px sans-serif";
      ctx.lineWidth = 3;
      ctx.strokeText(`${rect.name} (${rect.race})`, rect.x + 4, rect.y - 6);

      ctx.fillStyle = getContrastTextColor(rect.color);
      ctx.fillText(`${rect.name} (${rect.race})`, rect.x + 4, rect.y - 6);
    });

    const { height = 0, width = 0 } = currentRect || {};
    const hasSize = currentRect && width > 0 && height > 0;

    if (isDrawing && hasSize) {
      ctx.fillStyle = currentRect.color + "4D";
      ctx.strokeStyle = currentRect.color;
      ctx.fillRect(
        currentRect.x,
        currentRect.y,
        currentRect.width,
        currentRect.height
      );

      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
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
        <FactionTooltip
          key={tooltip.id}
          x={tooltip.x}
          y={tooltip.y}
          id={tooltip.id}
          onClick={tooltip.onClick}
        />
      ))}
      <FactionFormSideBar
        onColorChange={(id: string, color: string) => {
          setRectangles((prev) =>
            prev.map((rect) => (rect.id === id ? { ...rect, color } : rect))
          );
        }}
        onRemove={(id) => {
          setTooltips((prev) => prev.filter((t) => !t.id.includes(id)));
          setRectangles((prev) => prev.filter((rect) => rect.id !== id));
        }}
        onCreate={(name, description) => {
          console.log("Create faction:", name, description);
        }}
        factions={rectangles.map((rect) => ({
          id: rect.id,
          name: rect.name,
          color: rect.color,
        }))}
      />
    </div>
  );
};
