"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";

import { useQuery } from "@apollo/client";
import {
  Faction,
  GET_FACTIONS_FOR_BOARD,
  GET_SEEDS_BY_TYPES_QUERY,
} from "@repo/clients";
import Chance from "chance";
import { useParams } from "next/navigation";

import { FactionFormSideBar } from "./FactionSidebar";
import {
  FactionRelationsTooltip,
  type FactionToolTipProps,
} from "./FactionRelationsTooltip";
import type { FactionBoardPoint, FactionCard } from "./types";
import {
  buildFactionCard,
  buildTemporaryFactionCard,
  getContrastTextColor,
  getFactionDisplayText,
  getMousePosition,
  getUniqueRandomColor,
  hasFactionChanged,
  worldToScreen,
} from "./utils";
import theme from "@repo/theme";

const chance = new Chance();

export const FactionBoard = () => {
  const { id: campaign } = useParams();

  const { data } = useQuery(GET_FACTIONS_FOR_BOARD, {
    variables: { campaign },
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

  const [panOffset, setPanOffset] = useState<FactionBoardPoint>({
    start: null,
    x: 0,
    y: 0,
  });
  
  // Use a ref to track pan offset during dragging to avoid rerenders
  const panOffsetRef = useRef<FactionBoardPoint>({
    start: null,
    x: 0,
    y: 0,
  });

  // Sync ref with state
  useEffect(() => {
    panOffsetRef.current = panOffset;
  }, [panOffset]);

  const [cards, setCards] = useState<Array<FactionCard>>([]);
  const [tooltips, setTooltips] = useState<Array<FactionToolTipProps>>([]);
  const [startPoint, setStartPoint] = useState<FactionBoardPoint | null>(null);
  const [currentCard, setCurrentCard] = useState<FactionCard | null>(null);
  
  // Canvas dimensions state to handle SSR
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 800,  // Default fallback
    height: 600  // Default fallback
  });
  
  // Set canvas dimensions on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateDimensions = () => {
        setCanvasDimensions({
          width: window.innerWidth - 100,
          height: window.innerHeight - 200
        });
      };
      
      // Set initial dimensions
      updateDimensions();
      
      // Add resize listener
      window.addEventListener('resize', updateDimensions);
      
      // Cleanup
      return () => {
        window.removeEventListener('resize', updateDimensions);
      };
    }
  }, []);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext("2d");

  useEffect(() => {
    if (!ctx) return;

    const updatedCards = factions.map((faction, index) =>
      buildFactionCard(ctx, faction, index)
    );

    setCards(updatedCards);
  }, [factions, ctx]);

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

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (event.target !== canvasRef.current) return;

    const positions = getMousePosition(event, canvasRef.current, panOffsetRef.current);
    if (!positions || !ctx) return;

    if (event.button === 2 || event.button === 1 || event.shiftKey) {
      setIsPanning(true);
      panOffsetRef.current = { ...panOffsetRef.current, start: positions.screen };
      return;
    }

    const { world } = positions;
    const seeds = { noun: "", faction: "", adjective: "", race: "" };
    const color = theme.error.DEFAULT;

    setIsDrawing(true);
    setStartPoint(world);
    setCurrentCard(
      buildTemporaryFactionCard(
        ctx,
        world.x,
        world.y,
        0,
        0,
        color,
        cards.length + 1,
        seeds
      )
    );
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvas) return;

    const positions = getMousePosition(event, canvas, panOffsetRef.current);
    if (!positions) return;

    if (isPanning && tooltips.length === 0) {
      if (panOffsetRef.current.start) {
        const deltaX = positions.screen.x - panOffsetRef.current.start.x;
        const deltaY = positions.screen.y - panOffsetRef.current.start.y;
        
        // Update the ref directly without triggering a rerender
        panOffsetRef.current = {
          ...panOffsetRef.current,
          x: panOffset.x + deltaX,
          y: panOffset.y + deltaY,
        };
        
        // Force canvas redraw without state update
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.save();
          ctx.translate(panOffsetRef.current.x, panOffsetRef.current.y);

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

          ctx.restore();
        }
      }
      return;
    }

    if (ctx && startPoint) {
      const { world } = positions;
      const x = Math.min(startPoint.x, world.x);
      const y = Math.min(startPoint.y, world.y);
      const width = Math.abs(world.x - startPoint.x);
      const height = Math.abs(world.y - startPoint.y);

      const seeds = { noun: "", faction: "", adjective: "", race: "" };
      const color = theme.error.DEFAULT;

      setCurrentCard(
        buildTemporaryFactionCard(
          ctx,
          x,
          y,
          width,
          height,
          color,
          cards.length + 1,
          seeds
        )
      );
    }
  };

  const handleTooltipClick = useCallback((id: string, relationship: "conflict" | "alliance") => {
    console.log(id, relationship);
    setTooltips((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleMouseUp = () => {
    if (isPanning) {
      setIsPanning(false);
      // Update state with final position and clear start
      setPanOffset({ 
        start: null, 
        x: panOffsetRef.current.x, 
        y: panOffsetRef.current.y 
      });
      panOffsetRef.current = { 
        start: null, 
        x: panOffsetRef.current.x, 
        y: panOffsetRef.current.y 
      };
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
      cards.length + 1,
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
              onClick: handleTooltipClick,
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
  };

  // Memoize the callback functions to prevent unnecessary rerenders
  const handleFactionChange = useCallback(
    (faction: FactionCard) => {
      if (!canvas || !ctx) return;

      setCards((prev) =>
        prev.map((card, index) => {
          const isFaction = card.id === faction.id;

          if (!isFaction) return card;

          const updatedCard = { ...card };
          const updateCardName =
            updatedCard.data.name !== faction.data.name ||
            updatedCard.data.race !== faction.data.race;

          if (updateCardName) {
            const width = updatedCard.width;
            const fullName = `${faction.data.name} (${faction.data.race})`;
            updatedCard.label = getFactionDisplayText(ctx, fullName, width);
          }

          const isTemporary =
            card.isTemporary || hasFactionChanged(faction, factions[index]);

          return {
            ...updatedCard,
            data: { ...updatedCard.data, ...faction.data },
            isTemporary,
          };
        })
      );
    },
    [canvas, ctx, factions]
  );

  const handleFactionSave = useCallback(
    (faction: Faction) => {
      setCards((prev) =>
        prev.map((card) => {
          const isFaction =
            card.data.name === faction.name &&
            card.data.race === faction.race;

          if (!isFaction) return card;

          return { ...card, id: faction.id, isTemporary: false };
        })
      );
    },
    []
  );

  const handleReset = useCallback(() => {
    if (!canvas || !ctx) return;

    setTooltips([]);

    setCards((prev) =>
      prev.reduce<Array<FactionCard>>((acc, card, index) => {
        const faction = factions[card.position];
        if (!faction) return acc;
        return [...acc, buildFactionCard(ctx, faction, index)];
      }, [])
    );
  }, [canvas, ctx, factions]);

  const handleRemove = useCallback(
    (id: string) => {
      setTooltips((prev) => prev.filter((t) => !t.id.includes(id)));
      setCards((prev) => prev.filter((card) => card.id !== id));
    },
    []
  );

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        width={canvasDimensions.width}
        height={canvasDimensions.height}
        className={`block bg-gray-50 cursoir-pointer ${isPanning ? "cursor-grabbing" : isDrawing ? "cursor-crosshair" : ""}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onContextMenu={(e) => e.preventDefault()}
      />
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
        onChange={handleFactionChange}
        onSave={handleFactionSave}
        onReset={handleReset}
        onRemove={handleRemove}
        factions={cards}
      />
    </div>
  );
};
