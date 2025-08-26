import { useRef, useEffect, useState, useCallback } from "react";

import type { Faction } from "@repo/clients";

import { FactionBoardManager } from "../FactionBoardManager/FactionBoardManager";
import type { FactionCard } from "../types";

/**
 * Hook for managing the FactionBoardManager lifecycle and state
 * Handles canvas setup, manager creation/destruction, and card operations
 * @param canvasRef - React ref to the HTML canvas element
 * @param factions - Array of faction data to display
 * @param onDrawingComplete - Optional callback for when drawing is completed
 * @returns Object containing manager instance, cards state, and card operation methods
 */
export const useFactionBoardManager = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  factions: Array<Faction>,
  onDrawingComplete?: (card: FactionCard) => void
) => {
  const managerRef = useRef<FactionBoardManager | null>(null);
  const [cards, setCards] = useState<Array<FactionCard>>([]);
  const onDrawingCompleteRef = useRef(onDrawingComplete);

  useEffect(() => {
    onDrawingCompleteRef.current = onDrawingComplete;
  }, [onDrawingComplete]);

  useEffect(() => {
    if (!canvasRef.current || managerRef.current) {
      return;
    }

    try {
      const manager = new FactionBoardManager({
        canvas: canvasRef.current,
        onDrawingComplete: (card) => {
          if (onDrawingCompleteRef.current) {
            onDrawingCompleteRef.current(card);
          }
        },
      });

      managerRef.current = manager;
    } catch (error) {
      console.error('Error creating FactionBoardManager:', error);
      return;
    }

    return () => {
      if (managerRef.current) {
        managerRef.current.destroy();
        managerRef.current = null;
      }
    };
  }, [canvasRef]);

  useEffect(() => {
    if (!managerRef.current || factions.length === 0) return;

    const newCards = managerRef.current.buildCardsFromFactions(factions);
    managerRef.current.setCards(newCards);
    setCards(newCards);
  }, [factions]);

  /**
   * Adds a new card to the manager and updates local state
   * @param card - The faction card to add
   */
  const addCard = useCallback((card: FactionCard) => {
    if (!managerRef.current) return;
    
    managerRef.current.addCard(card);
    setCards(managerRef.current.getCards());
  }, []);

  /**
   * Removes a card from the manager and updates local state
   * @param id - The ID of the card to remove
   */
  const removeCard = useCallback((id: string) => {
    if (!managerRef.current) return;
    
    managerRef.current.removeCard(id);
    setCards(managerRef.current.getCards());
  }, []);

  /**
   * Updates an existing card in the manager and updates local state
   * @param id - The ID of the card to update
   * @param updates - Partial card object containing the updates to apply
   * @param immediate - Whether to render immediately (true) or throttled (false)
   */
  const updateCard = useCallback((id: string, updates: Partial<FactionCard>, immediate = false) => {
    if (!managerRef.current) return;
    
    managerRef.current.updateCard(id, updates, immediate);
    setCards(managerRef.current.getCards());
  }, []);

  /**
   * Completes the current drawing operation and returns the resulting card
   * @returns The completed FactionCard or null if drawing was incomplete
   */
  const completeDrawing = useCallback(() => {
    if (!managerRef.current) return null;
    
    const newCard = managerRef.current.completeDrawing();
    if (newCard) {
      setCards(managerRef.current.getCards());
    }
    return newCard;
  }, []);

  return {
    manager: managerRef.current,
    cards,
    addCard,
    removeCard,
    updateCard,
    completeDrawing,
  };
};
