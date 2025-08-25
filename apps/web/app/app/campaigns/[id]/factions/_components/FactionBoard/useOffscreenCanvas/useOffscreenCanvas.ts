/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRef, useEffect, useCallback } from 'react';

/**
 * Hook for managing an offscreen canvas with a dedicated worker
 * Provides hardware-accelerated rendering capabilities by moving canvas operations to a background thread
 * @param width - Canvas width in pixels
 * @param height - Canvas height in pixels
 * @returns Object containing canvas ref and rendering methods
 */
export const useOffscreenCanvas = (width: number, height: number) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenCanvasRef = useRef<OffscreenCanvas | null>(null);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const offscreenCanvas = canvasRef.current.transferControlToOffscreen();
    offscreenCanvasRef.current = offscreenCanvas;

    workerRef.current = new Worker('/offscreen-worker.js');
    workerRef.current.postMessage({
      type: 'INIT_CANVAS',
      canvas: offscreenCanvas,
      width,
      height
    }, [offscreenCanvas]);

    return () => {
      workerRef.current?.terminate();
    };
  }, [width, height]);

  /**
   * Sends rendering data to the offscreen canvas worker
   * @param data - Rendering data to be processed by the worker
   */
  const render = useCallback((data: any) => {
    workerRef.current?.postMessage({
      type: 'RENDER',
      data
    });
  }, []);

  /**
   * Clears the offscreen canvas
   */
  const clear = useCallback(() => {
    workerRef.current?.postMessage({
      type: 'CLEAR'
    });
  }, []);

  return {
    canvasRef,
    render,
    clear
  };
};
