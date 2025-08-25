/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRef, useEffect, useCallback } from "react";

import type { Faction } from "@repo/clients";

import type { FactionCard } from "../types";
import type { WorkerCallback } from "./types";

/**
 * Hook for managing a Web Worker that handles faction-related calculations
 * Provides methods to offload computationally expensive operations to a background thread
 * @returns Object containing worker methods and the worker instance
 */
export const useFactionWorker = () => {
  const workerRef = useRef<Worker | null>(null);
  const callbacksRef = useRef<Map<string, WorkerCallback>>(new Map());

  useEffect(() => {
    workerRef.current = new Worker("/faction-worker.js");

    workerRef.current.onmessage = (e) => {
      const { type, data } = e.data;
      const callback = callbacksRef.current.get(type);
      if (callback) {
        callback(data);
      }
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  /**
   * Sends a message to the worker and registers a callback for the response
   * @param type - The message type identifier
   * @param data - The data payload to send to the worker
   * @param callback - Optional callback function to handle the worker response
   */
  const postMessage = useCallback(
    (type: string, data: Record<string, any>, callback?: WorkerCallback) => {
      if (workerRef.current && callback) {
        callbacksRef.current.set(
          `${type.replace("_", "")}_CALCULATED`,
          callback
        );
        callbacksRef.current.set(`${type.replace("_", "")}_COMPLETE`, callback);
      }

      workerRef.current?.postMessage({ type, data });
    },
    []
  );

  /**
   * Calculates optimal positions for faction cards based on faction data
   * @param factions - Array of faction objects to position
   * @param callback - Callback function to receive the calculated positions
   */
  const calculateCardPositions = useCallback(
    (factions: Faction[], callback: WorkerCallback) => {
      postMessage("CALCULATE_CARD_POSITIONS", { factions }, callback);
    },
    [postMessage]
  );

  /**
   * Calculates overlaps between existing cards and a new card
   * @param cards - Array of existing faction cards
   * @param newCard - The new card to check for overlaps
   * @param callback - Callback function to receive overlap information
   */
  const calculateOverlaps = useCallback(
    (cards: FactionCard[], newCard: FactionCard, callback: WorkerCallback) => {
      postMessage("CALCULATE_OVERLAPS", { cards, newCard }, callback);
    },
    [postMessage]
  );

  /**
   * Builds faction cards from faction data using the worker
   * @param factions - Array of faction objects to convert to cards
   * @param callback - Callback function to receive the built cards
   */
  const buildFactionCards = useCallback(
    (factions: Faction[], callback: WorkerCallback) => {
      postMessage("BUILD_FACTION_CARDS", { factions }, callback);
    },
    [postMessage]
  );

  return {
    calculateCardPositions,
    calculateOverlaps,
    buildFactionCards,
    worker: workerRef.current,
  };
};
