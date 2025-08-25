import { useCallback } from "react";

import Chance from "chance";

import { useFactionWorker } from "../useFactionWorker/useFactionWorker";
import { getUniqueRandomColor, buildTemporaryFactionCard } from "../utils";
import type { FactionCard } from "../types";
import type { UseDrawingLogicParams } from "./types";

const chance = new Chance();

/**
 * Hook that handles the logic for completing drawing operations and creating new faction cards
 * Manages the process of converting drawn rectangles into faction cards with generated names and relationships
 * @param params - Configuration object containing cards, callbacks, pan offset, and seed data
 * @returns Object containing the drawing completion handler
 */
export const useDrawingLogic = ({
  cards,
  onCardAdded,
  onTooltipsAdded,
  panOffset,
  seeds,
}: UseDrawingLogicParams) => {
  const { calculateOverlaps } = useFactionWorker();

  /**
   * Handles the completion of a drawing operation by generating a new faction card
   * Creates random faction attributes and calculates overlaps with existing cards
   * @param drawnCard - The card representing the drawn rectangle
   * @param ctx - Canvas 2D rendering context for text measurement
   */
  const handleDrawingComplete = useCallback(
    (drawnCard: FactionCard, ctx: CanvasRenderingContext2D) => {
      
      const { races, nouns, adjectives, factions } = seeds;
      const usedColors = cards.map((card) => card.data.color);

      const nounsMax = nouns?.length ? nouns.length - 1 : 0;
      const adjectivesMax = adjectives?.length ? adjectives.length - 1 : 0;
      const racesMax = races?.length ? races.length - 1 : 0;
      const factionsMax = factions?.length ? factions.length - 1 : 0;

      const nounsIndex = chance.integer({ min: 0, max: nounsMax });
      const adjectivesIndex = chance.integer({ min: 0, max: adjectivesMax });
      const racesIndex = chance.integer({ min: 0, max: racesMax });
      const factionsIndex = chance.integer({ min: 0, max: factionsMax });

      const seedValues = {
        noun: nouns[nounsIndex]?.value ?? "",
        adjective: adjectives[adjectivesIndex]?.value ?? "",
        race: races[racesIndex]?.value ?? "",
        faction: factions[factionsIndex]?.value ?? "",
      };

      const newCard = buildTemporaryFactionCard(
        ctx,
        drawnCard.x,
        drawnCard.y,
        drawnCard.width,
        drawnCard.height,
        getUniqueRandomColor(usedColors),
        cards.length + 1,
        seedValues
      );

      calculateOverlaps(
        cards,
        newCard,
        (data: {
          overlaps: Array<{
            cardId: string;
            newCardId: string;
            centerX: number;
            centerY: number;
          }>;
        }) => {
          const newTooltips = data.overlaps.map((overlap) => {
            return {
              id: `tooltip-${overlap.cardId}-${overlap.newCardId}`,
              x: overlap.centerX + panOffset.x,
              y: overlap.centerY + panOffset.y,
              onClick: (id: string, relationship: "conflict" | "alliance") => {
                console.log(id, relationship);
              },
            };
          });

          onCardAdded(newCard);
          onTooltipsAdded(newTooltips);
        }
      );
    },
    [cards, calculateOverlaps, onCardAdded, onTooltipsAdded, panOffset, seeds]
  );

  return {
    handleDrawingComplete,
  };
};
