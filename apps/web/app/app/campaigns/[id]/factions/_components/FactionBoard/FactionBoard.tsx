"use client";

import { useState, useRef, useEffect, useCallback } from "react";

import Chance from "chance";

import { FactionTooltip, type FactionToolTipProps } from "./FactionTooltip";
import type { Point, Rectangle } from "./types";
import { NAMES, RACES } from "./constants";
import { Button, IconButton, Input, TextArea } from "@repo/components";

const chance = new Chance();

const getUniqueRandomColor = (usedColors: string[]): string => {
  let newColor: string;

  do {
    newColor = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
  } while (usedColors.includes(newColor));

  return newColor;
};

/*
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Race
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Select a race...</option>
              {RACES.map((race) => (
                <option key={race} value={race}>
                  {race}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Faction Color
            </label>
            <input
              type="color"
              className="w-full h-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="#3498db"
            />
          </div>

*/

const FactionFormSideBar = ({
  factions,
  onRemove,
  onCreate,
  onColorChange,
}: {
  onColorChange: (id: string, color: string) => void;
  onRemove: (id: string) => void;
  onCreate: (name: string, description: string) => void;
  factions: Array<{ id: string; name?: string; color: string }>;
}) => {
  return (
    <div
      className="fixed left-0 bg-palette-600 shadow-lg border-r border-palette-100 z-40 overflow-y-auto pb-10"
      style={{
        width: "400px",
        top: "var(--full-appbar-height, 88px)",
        height: "calc(100vh - var(--full-appbar-height, 88px))",
      }}
    >
      {/* Sticky header with Create All button */}
      <div className="sticky flex flex-col gap-2 top-0 bg-palette-600 p-6 pb-6 mb-4 border-b border-palette-100 z-10">
        <h6 className="w-full text-lg font-semibold text-palette-100 uppercase text-center">
          Factions
        </h6>
        {factions?.length
          ? [
              <Button
                key="faction-create-all"
                className="w-full"
                variant="fill"
              >
                Create All
              </Button>,
              <Button
                key="faction-remove-all"
                className="w-full"
                mode="secondary"
                onClick={() =>
                  factions.forEach((faction) => onRemove(faction.id))
                }
              >
                Remove All
              </Button>,
            ]
          : null}
      </div>
      <div className="p-6 pt-3 flex flex-col gap-6">
        {factions.map((faction) => (
          <div key={faction.id} className="flex flex-col gap-2">
            <div className="flex items-center gap-2 w-full">
              <button
                className={`w-10 rounded h-10 flex-shrink-0 hover:cursor-pointer`}
                style={{ backgroundColor: faction.color }}
                onClick={() =>
                  window.document
                    .getElementById(`${faction.id}-color-input`)
                    ?.click()
                }
              />
              <input
                id={`${faction.id}-color-input`}
                type="color"
                hidden
                value={faction.color}
                onChange={(ev) => onColorChange(faction.id, ev.target.value)}
              />
              <Input placeholder="Faction Name" defaultValue={faction.name} />
            </div>
            <TextArea placeholder="Description" rows={1} />
            <div className="flex gap-2">
              <IconButton
                onClick={() => onRemove(faction.id)}
                icon="delete"
                size={2}
                color={300}
                className="hover:opacity-80"
              />
              <Button
                type="button"
                variant="fill"
                className="w-full"
                onClick={() => {
                  if (faction.name) {
                    onCreate(faction.name, "");
                  }
                }}
              >
                Create
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

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
      ctx.fillStyle = rect.color + "40";
      ctx.fillRect(rect.x, rect.y, rect.width, rect.height);

      ctx.strokeStyle = rect.color + "FF";
      ctx.lineWidth = 2;
      ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);

      ctx.font = "16px sans-serif";
      ctx.lineWidth = 3;
      ctx.strokeStyle = rect.color + "50";
      ctx.strokeText(`${rect.name} (${rect.race})`, rect.x + 4, rect.y - 5);

      ctx.fillStyle = rect.color;
      ctx.fillText(`${rect.name} (${rect.race})`, rect.x + 4, rect.y - 5);
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
          console.log("Color change:", id, color);
          setRectangles((prev) =>
            prev.map((rect) =>
              rect.id === id ? { ...rect, color } : rect
            )
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
