"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";

import { useQuery } from "@apollo/client";
import { GET_SEEDS_BY_TYPES_QUERY } from "@repo/clients";
import Chance from "chance";

import { FactionFormSideBar } from "./FactionSidebar";
import {
  FactionRelationsTooltip,
  type FactionToolTipProps,
} from "./FactionRelationsTooltip";
import type { Point, Rectangle } from "./types";
import {
  buildRectangle,
  generateRectangleLabels,
  getContrastTextColor,
  getMousePosition,
  getUniqueRandomColor,
  worldToScreen,
} from "./utils";
import {
  FactionNameTooltip,
  FactionNameTooltipData,
} from "./FactionNameTooltip";

const chance = new Chance();

type SeedData = {
  createdAt: string;
  id: string;
  type: string;
  updatedAt: string;
  userId: string;
  value: string;
};

type SeedsByTypes = {
  seedsByTypes: {
    race: SeedData[];
    noun: SeedData[];
    faction: SeedData[];
    adjective: SeedData[];
  };
};

export const FactionBoard = () => {
  const { data } = useQuery<SeedsByTypes>(GET_SEEDS_BY_TYPES_QUERY, {
    variables: { types: ["race", "noun", "faction", "adjective"] },
  });

  const { races, nouns, factions, adjectives } = useMemo(() => {
    if (!data?.seedsByTypes) {
      return { races: [], nouns: [], factions: [], adjectives: [] };
    }

    return {
      races: data.seedsByTypes.race ?? [],
      nouns: data.seedsByTypes.noun ?? [],
      factions: data.seedsByTypes.faction ?? [],
      adjectives: data.seedsByTypes.adjective ?? [],
    };
  }, [data]);

  const [isDrawing, setIsDrawing] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [panStart, setPanStart] = useState<Point | null>(null);
  const [rectangles, setRectangles] = useState<Array<Rectangle>>([]);
  const [tooltips, setTooltips] = useState<Array<FactionToolTipProps>>([]);
  const [nameTooltip, setNameTooltip] = useState<FactionNameTooltipData>(null);
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [currentRect, setCurrentRect] = useState<Rectangle | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (event.target !== canvasRef.current) return;

    const positions = getMousePosition(event, canvasRef.current, panOffset);
    if (!positions) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (event.button === 2 || event.button === 1 || event.shiftKey) {
      setIsPanning(true);
      setPanStart(positions.screen);
      return;
    }

    const { world } = positions;

    setIsDrawing(true);
    setStartPoint(world);
    setCurrentRect(
      buildRectangle(ctx, world.x, world.y, 0, 0, "#ff6b6b", {
        noun: "",
        faction: "",
        adjective: "",
        race: "",
      })
    );
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const positions = getMousePosition(event, canvas, panOffset);
    if (!positions) return;

    if (isPanning && panStart && tooltips.length === 0) {
      const deltaX = positions.screen.x - panStart.x;
      const deltaY = positions.screen.y - panStart.y;

      setPanOffset((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));

      setPanStart(positions.screen);

      return;
    }

    if (!isDrawing) {
      const { world } = positions;

      for (let i = rectangles.length - 1; i >= 0; i--) {
        const r = rectangles[i];

        const isHovered =
          r &&
          world.x >= r.x &&
          world.x <= r.x + r.width &&
          world.y >= r.y - 26 &&
          world.y <= r.y + r.height + 26 &&
          r.label.includes("...");

        if (isHovered) {
          const screenPos = worldToScreen(world.x, world.y, panOffset);

          setNameTooltip({
            id: r.id,
            label: r.originalLabel,
            x: screenPos.x,
            y: screenPos.y,
          });

          return;
        }
      }

      if (nameTooltip) setNameTooltip(null);
    } else if (startPoint) {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const { world } = positions;
      const x = Math.min(startPoint.x, world.x);
      const y = Math.min(startPoint.y, world.y);
      const width = Math.abs(world.x - startPoint.x);
      const height = Math.abs(world.y - startPoint.y);

      setCurrentRect(
        buildRectangle(ctx, x, y, width, height, "#ff6b6b", {
          noun: "",
          adjective: "",
          faction: "",
          race: "",
        })
      );
    }
  };

  const handleMouseUp = useCallback(() => {
    if (isPanning) {
      setIsPanning(false);
      setPanStart(null);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width = 0, height = 0 } = currentRect || {};
    const isTooSmall = width < 100 || height < 100;

    if (!isDrawing || !currentRect || isTooSmall) {
      setIsDrawing(false);
      setStartPoint(null);
      setCurrentRect(null);
      return;
    }

    const usedColors = rectangles.map((rect) => rect.color);

    const nounsMax = nouns?.length ? nouns.length - 1 : 0;
    const adjectivesMax = adjectives?.length ? adjectives.length - 1 : 0;
    const racesMax = races?.length ? races.length - 1 : 0;
    const factionsMax = factions?.length ? factions.length - 1 : 0;

    const nounsIndex = chance.integer({ min: 0, max: nounsMax });
    const adjectivesIndex = chance.integer({ min: 0, max: adjectivesMax });
    const racesIndex = chance.integer({ min: 0, max: racesMax });
    const factionsIndex = chance.integer({ min: 0, max: factionsMax });

    const seeds = {
      noun: nouns[nounsIndex]?.value ?? "",
      adjective: adjectives[adjectivesIndex]?.value ?? "",
      race: races[racesIndex]?.value ?? "",
      faction: factions[factionsIndex]?.value ?? "",
    };

    const newRect = buildRectangle(
      ctx,
      currentRect.x,
      currentRect.y,
      currentRect.width,
      currentRect.height,
      getUniqueRandomColor(usedColors),
      seeds
    );

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

          const screenPos = worldToScreen(
            overlapCenterX,
            overlapCenterY,
            panOffset
          );

          return [
            ...acc,
            {
              id: `tooltip-${rectangle.id}-${newRect.id}`,
              x: screenPos.x,
              y: screenPos.y,
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
  }, [
    isPanning,
    currentRect,
    isDrawing,
    rectangles,
    nouns,
    adjectives,
    races,
    factions,
    panOffset,
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(panOffset.x, panOffset.y);

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
      ctx.fillStyle = getContrastTextColor(rect.color);
      ctx.fillText(rect.label, rect.x + 10, rect.y - 6);
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

    ctx.restore();
  }, [rectangles, currentRect, isDrawing, tooltips, panOffset]);

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        width={window.innerWidth - 100}
        height={window.innerHeight - 200}
        className={`block bg-gray-50 cursoir-pointer ${isPanning ? "cursor-grabbing" : isDrawing ? "cursor-crosshair" : ""}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onContextMenu={(e) => e.preventDefault()}
      />
      {nameTooltip ? (
        <FactionNameTooltip
          x={nameTooltip.x}
          y={nameTooltip.y}
          label={nameTooltip.label}
        />
      ) : null}
      {tooltips.map((tooltip) => (
        <FactionRelationsTooltip
          key={tooltip.id}
          x={tooltip.x}
          y={tooltip.y}
          id={tooltip.id}
          onClick={tooltip.onClick}
        />
      ))}
      <FactionFormSideBar
        onFactionChange={(faction) => {
          const canvas = canvasRef.current;
          if (!canvas) return;

          const ctx = canvas.getContext("2d");
          if (!ctx) return;

          setRectangles((prev) =>
            prev.map((rect) => {
              const isRectangle = rect.id === faction.id;
              if (!isRectangle) return rect;

              const updatedRect = { ...rect };
              updatedRect.data = { ...updatedRect.data, ...faction };

              const { label, originalLabel } = generateRectangleLabels(
                ctx,
                updatedRect.width,
                updatedRect.data
              );

              return { ...updatedRect, label, originalLabel };
            })
          );
        }}
        onColorChange={(id: string, color: string) => {
          setRectangles((prev) =>
            prev.map((rect) => (rect.id === id ? { ...rect, color } : rect))
          );
        }}
        onRemove={(id) => {
          setTooltips((prev) => prev.filter((t) => !t.id.includes(id)));
          setRectangles((prev) => prev.filter((rect) => rect.id !== id));
        }}
        factions={rectangles.map((rect) => ({
          ...rect.data,
          id: rect.id,
          color: rect.color,
        }))}
      />
    </div>
  );
};
