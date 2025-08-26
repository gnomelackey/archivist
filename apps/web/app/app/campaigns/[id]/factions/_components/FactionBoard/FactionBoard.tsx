"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";

import { useQuery } from "@apollo/client";
import {
  Faction,
  GET_FACTIONS_FOR_BOARD,
  GET_SEEDS_BY_TYPES_QUERY,
} from "@repo/clients";
import { useParams } from "next/navigation";

import { FactionFormSideBar } from "./FactionSidebar";
import {
  FactionRelationsTooltip,
  type FactionToolTipProps,
} from "./FactionRelationsTooltip";
import { useFactionBoardManager } from "./useFactionBoardManager";
import { useDrawingLogic } from "./useDrawingLogic/useDrawingLogic";
import type { FactionCard } from "./types";

const CANVAS_DIMENSIONS = { width: 1200, height: 800 };

export const FactionBoard = () => {
  const { id: campaign } = useParams();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [canvasDimensions, setCanvasDimensions] = useState(CANVAS_DIMENSIONS);
  const [tooltips, setTooltips] = useState<Array<FactionToolTipProps>>([]);

  const { data } = useQuery(GET_FACTIONS_FOR_BOARD, {
    variables: { campaign },
  });

  const { data: seeds } = useQuery(GET_SEEDS_BY_TYPES_QUERY, {
    variables: { types: ["race", "noun", "faction", "adjective"] },
  });

  const factions: Array<Faction> = useMemo(() => {
    const result = data?.factionsWithCoordinates ?? [];
    return result;
  }, [data]);

  const seedsData = useMemo(() => {
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

  const drawingCompletionRef = useRef<
    ((drawnCard: FactionCard, ctx: CanvasRenderingContext2D) => void) | null
  >(null);

  const onDrawingComplete = useCallback((drawnCard: FactionCard) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx && drawingCompletionRef.current) {
      requestAnimationFrame(() => {
        drawingCompletionRef.current!(drawnCard, ctx);
      });
    }
  }, []);

  const { manager, cards, addCard, removeCard, updateCard } =
    useFactionBoardManager(canvasRef, factions, onDrawingComplete);

  // Memoize cards to prevent unnecessary re-renders of form components
  const memoizedCards = useMemo(() => cards, [cards]);

  const { handleDrawingComplete } = useDrawingLogic({
    cards,
    onCardAdded: addCard,
    onTooltipsAdded: (newTooltips) => {
      setTooltips((prev) => [...prev, ...newTooltips]);
    },
    panOffset: manager?.getPanOffset() ?? { x: 0, y: 0 },
    seeds: seedsData,
  });

  useEffect(() => {
    drawingCompletionRef.current = handleDrawingComplete;
  }, [handleDrawingComplete]);

  const handleFactionChange = useCallback(
    (faction: FactionCard) => {
      // Simple, direct update - no complex debouncing or refs
      updateCard(faction.id, faction, false); // Always use throttled rendering
    },
    [updateCard]
  );

  const handleFactionSave = useCallback(
    (faction: Faction) => {
      const cardToUpdate = cards.find(
        (card) =>
          card.data.name === faction.name && card.data.race === faction.race
      );

      if (cardToUpdate) {
        updateCard(cardToUpdate.id, {
          id: faction.id,
          isTemporary: false,
        }, true); // immediate render for save operations
      }
    },
    [cards, updateCard]
  );

  const handleFactionReset = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !manager) return;

    setTooltips([]);

    const resetCards = manager.buildCardsFromFactions(factions);
    manager.setCards(resetCards);
  }, [manager, factions]);

  const handleFactionRemove = useCallback(
    (id: string) => {
      setTooltips((prev) => prev.filter((t) => !t.id.includes(id)));
      removeCard(id);
    },
    [removeCard]
  );

  const handleTooltipClick = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (id: string, _relationship: "conflict" | "alliance") => {
      setTooltips((prev) => prev.filter((t) => t.id !== id));
    },
    []
  );

  useEffect(() => {
    const updateDimensions = () => {
      setCanvasDimensions({
        width: window.innerWidth - 100,
        height: window.innerHeight - 200,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        width={canvasDimensions.width}
        height={canvasDimensions.height}
        className="block bg-gray-50 cursor-pointer"
        style={{ imageRendering: "pixelated" }}
      />
      {tooltips.map((tooltip) => (
        <FactionRelationsTooltip
          key={tooltip.id}
          x={tooltip.x}
          y={tooltip.y}
          id={tooltip.id}
          onClick={handleTooltipClick}
        />
      ))}
      <FactionFormSideBar
        onChange={handleFactionChange}
        onSave={handleFactionSave}
        onReset={handleFactionReset}
        onRemove={handleFactionRemove}
        factions={memoizedCards}
      />
    </div>
  );
};
