"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";

import { useQuery } from "@apollo/client";
import {
  Faction,
  GET_FACTIONS_WITH_COORDINATES,
  GET_SEEDS_BY_TYPES_QUERY,
} from "@repo/clients";
import { CoordinateLocationEnum } from "@repo/enums";
import Chance from "chance";
import { useParams } from "next/navigation";

import { FactionFormSideBar } from "./FactionSidebar";
import {
  FactionRelationsTooltip,
  type FactionToolTipProps,
} from "./FactionRelationsTooltip";
import {
  FactionNameTooltip,
  FactionNameTooltipData,
} from "./FactionNameTooltip";
import type { FactionBoardPoint, FactionCard } from "./types";
import {
  buildFactionCard,
  buildTemporaryFactionCard,
  getContrastTextColor,
  getFactionDisplayText,
  getMousePosition,
  getUniqueRandomColor,
  worldToScreen,
} from "./utils";

const chance = new Chance();

export const FactionBoard = () => {
  const { id: campaign } = useParams();

  const { data } = useQuery(GET_FACTIONS_WITH_COORDINATES, {
    variables: { campaign, location: CoordinateLocationEnum.FACTION_BOARD },
  });

  const { data: seeds } = useQuery(GET_SEEDS_BY_TYPES_QUERY, {
    variables: { types: ["race", "noun", "faction", "adjective"] },
  });

  const factions: Array<Faction> = useMemo(
    () => data?.factionsWithCoordinates ?? [],
    [data]
  );

  const {
    races,
    nouns,
    factions: factionNames,
    adjectives,
  } = useMemo(() => {
    if (!seeds) {
      return { races: [], nouns: [], factions: [], adjectives: [] };
    }

    return {
      races: seeds.seedsByTypes.race ?? [],
      nouns: seeds.seedsByTypes.noun ?? [],
      factions: seeds.seedsByTypes.faction ?? [],
      adjectives: seeds.seedsByTypes.adjective ?? [],
    };
  }, [seeds]);

  const [isDrawing, setIsDrawing] = useState(false);
  const [isPanning, setIsPanning] = useState(false);

  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

  const [cards, setCards] = useState<Array<FactionCard>>([]);
  const [tooltips, setTooltips] = useState<Array<FactionToolTipProps>>([]);
  const [nameTooltip, setNameTooltip] = useState<FactionNameTooltipData>(null);
  const [panStart, setPanStart] = useState<FactionBoardPoint | null>(null);
  const [startPoint, setStartPoint] = useState<FactionBoardPoint | null>(null);
  const [currentCard, setCurrentCard] = useState<FactionCard | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext("2d");

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (event.target !== canvasRef.current) return;

    const positions = getMousePosition(event, canvasRef.current, panOffset);
    if (!positions || !ctx) return;

    if (event.button === 2 || event.button === 1 || event.shiftKey) {
      setIsPanning(true);
      setPanStart(positions.screen);
      return;
    }

    const { world } = positions;
    const seeds = { noun: "", faction: "", adjective: "", race: "" };
    const color = "#ff6b6b";

    setIsDrawing(true);
    setStartPoint(world);
    setCurrentCard(
      buildTemporaryFactionCard(ctx, world.x, world.y, 0, 0, color, seeds)
    );
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
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

      for (let i = cards.length - 1; i >= 0; i--) {
        const r = cards[i];

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
            label: `${r.data.name} (${r.data.race})`,
            x: screenPos.x,
            y: screenPos.y,
          });

          return;
        }
      }

      if (nameTooltip) setNameTooltip(null);
    } else if (ctx && startPoint) {
      const { world } = positions;
      const x = Math.min(startPoint.x, world.x);
      const y = Math.min(startPoint.y, world.y);
      const width = Math.abs(world.x - startPoint.x);
      const height = Math.abs(world.y - startPoint.y);

      const seeds = { noun: "", faction: "", adjective: "", race: "" };
      const color = "#ff6b6b";

      setCurrentCard(
        buildTemporaryFactionCard(ctx, x, y, width, height, color, seeds)
      );
    }
  };

  const handleMouseUp = useCallback(() => {
    if (isPanning) {
      setIsPanning(false);
      setPanStart(null);
      return;
    }

    if (!ctx) return;

    const { width = 0, height = 0 } = currentCard || {};
    const isTooSmall = width < 100 || height < 100;

    if (!isDrawing || !currentCard || isTooSmall) {
      setIsDrawing(false);
      setStartPoint(null);
      setCurrentCard(null);
      return;
    }

    const usedColors = cards.map((card) => card.data.color);

    const nounsMax = nouns?.length ? nouns.length - 1 : 0;
    const adjectivesMax = adjectives?.length ? adjectives.length - 1 : 0;
    const racesMax = races?.length ? races.length - 1 : 0;
    const factionsMax = factionNames?.length ? factionNames.length - 1 : 0;

    const nounsIndex = chance.integer({ min: 0, max: nounsMax });
    const adjectivesIndex = chance.integer({ min: 0, max: adjectivesMax });
    const racesIndex = chance.integer({ min: 0, max: racesMax });
    const factionsIndex = chance.integer({ min: 0, max: factionsMax });

    const seeds = {
      noun: nouns[nounsIndex]?.value ?? "",
      adjective: adjectives[adjectivesIndex]?.value ?? "",
      race: races[racesIndex]?.value ?? "",
      faction: factionNames[factionsIndex]?.value ?? "",
    };

    const newCard = buildTemporaryFactionCard(
      ctx,
      currentCard.x,
      currentCard.y,
      currentCard.width,
      currentCard.height,
      getUniqueRandomColor(usedColors),
      seeds
    );

    const newTooltips = cards.reduce<Array<FactionToolTipProps>>(
      (acc, card) => {
        const oldCardRight = card.x + card.width;
        const newCardRight = newCard.x + newCard.width;
        const oldCardBottom = card.y + card.height;
        const newCardBottom = newCard.y + newCard.height;

        if (
          card.x < newCardRight &&
          oldCardRight > newCard.x &&
          card.y < newCardBottom &&
          oldCardBottom > newCard.y
        ) {
          const overlapLeft = Math.max(card.x, newCard.x);
          const overlapTop = Math.max(card.y, newCard.y);
          const overlapRight = Math.min(oldCardRight, newCardRight);
          const overlapBottom = Math.min(oldCardBottom, newCardBottom);

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
              id: `tooltip-${card.id}-${newCard.id}`,
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

    setCards((prev) => [...prev, newCard]);
    setTooltips((prev) => [...prev, ...newTooltips]);
    setIsDrawing(false);
    setStartPoint(null);
    setCurrentCard(null);
  }, [
    isPanning,
    ctx,
    currentCard,
    isDrawing,
    cards,
    nouns,
    adjectives,
    races,
    factionNames,
    panOffset,
  ]);

  useEffect(() => {
    if (!factions?.length) return;
    if (!ctx) return;

    const updatedCards = factions.map((faction) =>
      buildFactionCard(ctx, faction)
    );

    setCards(updatedCards);
  }, [factions, canvasRef, ctx]);

  useEffect(() => {
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(panOffset.x, panOffset.y);

    cards.forEach((card) => {
      const borderColor = card.data.color + "FF";
      const fillColor = card.data.color + "40";

      ctx.fillStyle = fillColor;
      ctx.fillRect(card.x, card.y, card.width, card.height);

      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 2;
      ctx.strokeRect(card.x, card.y, card.width, card.height);

      ctx.fillStyle = borderColor;
      ctx.fillRect(card.x - 1, card.y - 26, card.width + 2, 25);

      ctx.font = "16px sans-serif";

      ctx.lineWidth = 3;
      ctx.fillStyle = getContrastTextColor(card.data.color);
      ctx.fillText(card.label, card.x + 10, card.y - 6);
    });

    const { height = 0, width = 0 } = currentCard || {};
    const hasSize = currentCard && width > 0 && height > 0;

    if (isDrawing && hasSize) {
      ctx.fillStyle = currentCard.data.color + "4D";
      ctx.strokeStyle = currentCard.data.color;
      ctx.fillRect(
        currentCard.x,
        currentCard.y,
        currentCard.width,
        currentCard.height
      );

      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(
        currentCard.x,
        currentCard.y,
        currentCard.width,
        currentCard.height
      );
      ctx.setLineDash([]);
    }

    ctx.restore();
  }, [cards, currentCard, isDrawing, tooltips, panOffset, canvas, ctx]);

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
          if (!canvas || !ctx) return;

          setCards((prev) =>
            prev.map((card) => {
              const isFaction = card.id === faction.id;
              if (!isFaction) return card;

              const updatedCard = { ...card };

              if (updatedCard.data.name !== faction.data.name) {
                const width = updatedCard.width;
                const fullName = `${faction.data.name} (${faction.data.race})`;
                updatedCard.label = getFactionDisplayText(ctx, fullName, width);
              }

              updatedCard.data = { ...updatedCard.data, ...faction };

              return updatedCard;
            })
          );
        }}
        onRemove={(id) => {
          setTooltips((prev) => prev.filter((t) => !t.id.includes(id)));
          setCards((prev) => prev.filter((card) => card.id !== id));
        }}
        factions={cards}
      />
    </div>
  );
};
