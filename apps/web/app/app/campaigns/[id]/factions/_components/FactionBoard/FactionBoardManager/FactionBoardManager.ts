import type { Faction } from "@repo/clients";

import type { FactionBoardManagerConfig } from "./types";
import type { FactionBoardPoint, FactionCard } from "../types";
import { buildFactionCard, getContrastTextColor } from "../utils";

export class FactionBoardManager {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private cards: Array<FactionCard> = [];
  private panOffset = { x: 0, y: 0 };
  private currentCard: FactionCard | null = null;
  private isDrawing = false;
  private isPanning = false;
  private panStart: FactionBoardPoint | null = null;
  private startPoint: FactionBoardPoint | null = null;
  private panThrottleId: number | null = null;
  private drawThrottleId: number | null = null;

  private onDrawingComplete?: (card: FactionCard) => void;

  constructor(config: FactionBoardManagerConfig) {
    this.canvas = config.canvas;
    this.onDrawingComplete = config.onDrawingComplete;

    const ctx = this.canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Could not get 2D context from canvas");
    }
    this.ctx = ctx;

    this.setupEventListeners();
  }

  private setupEventListeners() {
    this.canvas.addEventListener("mousedown", this.handleMouseDown.bind(this));
    this.canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
    this.canvas.addEventListener("mouseup", this.handleMouseUp.bind(this));
    this.canvas.addEventListener("mouseleave", this.handleMouseUp.bind(this));
    this.canvas.addEventListener("contextmenu", (e) => e.preventDefault());
  }

  public destroy() {
    this.canvas.removeEventListener("mousedown", this.handleMouseDown);
    this.canvas.removeEventListener("mousemove", this.handleMouseMove);
    this.canvas.removeEventListener("mouseup", this.handleMouseUp);
    this.canvas.removeEventListener("mouseleave", this.handleMouseUp);

    if (this.panThrottleId) {
      cancelAnimationFrame(this.panThrottleId);
    }
    if (this.drawThrottleId) {
      cancelAnimationFrame(this.drawThrottleId);
    }
  }

  public setCards(cards: Array<FactionCard>) {
    this.cards = cards;
    this.render();
  }

  public getCards(): Array<FactionCard> {
    return [...this.cards];
  }

  public addCard(card: FactionCard) {
    this.cards.push(card);
    this.render();
  }

  public removeCard(id: string) {
    this.cards = this.cards.filter((card) => card.id !== id);
    this.render();
  }

  public updateCard(id: string, updates: Partial<FactionCard>) {
    this.cards = this.cards.map((card) =>
      card.id === id ? { ...card, ...updates } : card
    );
    this.render();
  }

  public buildCardsFromFactions(factions: Array<Faction>): Array<FactionCard> {
    return factions.map((faction, index) =>
      buildFactionCard(this.ctx, faction, index)
    );
  }

  public setPanOffset(offset: { x: number; y: number }) {
    this.panOffset = offset;
    this.renderAnimationFrame();
  }

  public getPanOffset(): { x: number; y: number } {
    return { ...this.panOffset };
  }

  private renderAnimationFrame() {
    requestAnimationFrame(() => {
      this.render();
    });
  }

  private render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.save();
    this.ctx.translate(this.panOffset.x, this.panOffset.y);

    this.ctx.imageSmoothingEnabled = false;
    this.ctx.font = "16px sans-serif";
    this.ctx.lineWidth = 2;

    this.cards.forEach((card) => {
      this.renderCard(card);
    });

    if (this.isDrawing && this.currentCard) {
      this.renderDrawingCard(this.currentCard);
    }

    this.ctx.restore();
  }

  private renderCard(card: FactionCard) {
    const borderColor = card.data.color + "FF";
    const fillColor = card.data.color + "40";

    this.ctx.fillStyle = fillColor;
    this.ctx.fillRect(card.x, card.y, card.width, card.height);

    this.ctx.strokeStyle = borderColor;
    this.ctx.strokeRect(card.x, card.y, card.width, card.height);

    this.ctx.fillStyle = borderColor;
    this.ctx.fillRect(card.x - 1, card.y - 26, card.width + 2, 25);

    this.ctx.fillStyle = getContrastTextColor(card.data.color);
    this.ctx.fillText(card.label, card.x + 10, card.y - 6);
  }

  private renderDrawingCard(card: FactionCard) {
    const { width = 0, height = 0 } = card;
    const hasSize = width > 0 && height > 0;

    if (hasSize) {
      this.ctx.fillStyle = card.data.color + "4D";
      this.ctx.fillRect(card.x, card.y, card.width, card.height);

      this.ctx.strokeStyle = card.data.color;
      this.ctx.setLineDash([5, 5]);
      this.ctx.strokeRect(card.x, card.y, card.width, card.height);
      this.ctx.setLineDash([]);
    }
  }

  private getMousePosition(
    event: MouseEvent
  ): { screen: FactionBoardPoint; world: FactionBoardPoint } | null {
    const rect = this.canvas.getBoundingClientRect();
    const screen = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    const world = {
      x: screen.x - this.panOffset.x,
      y: screen.y - this.panOffset.y,
    };

    return { screen, world };
  }

  private handleMouseDown(event: MouseEvent) {
    const positions = this.getMousePosition(event);
    if (!positions) return;

    if (event.button === 2 || event.button === 1 || event.shiftKey) {
      this.isPanning = true;
      this.panStart = positions.screen;
      this.canvas.style.cursor = "grabbing";
      return;
    }

    const { world } = positions;
    const color = "#ff6b6b";

    this.isDrawing = true;
    this.startPoint = world;
    this.canvas.style.cursor = "crosshair";

    this.currentCard = {
      id: `temp-drawing-${Date.now()}`,
      x: world.x,
      y: world.y,
      width: 0,
      height: 0,
      label: "Drawing...",
      position: this.cards.length + 1,
      isTemporary: true,
      data: {
        name: "New Faction",
        color,
        race: "Unknown",
        description: "",
      },
    };

    this.renderAnimationFrame();
  }

  private handleMouseMove(event: MouseEvent) {
    const positions = this.getMousePosition(event);
    if (!positions) return;

    if (this.isPanning && this.panStart) {
      const deltaX = positions.screen.x - this.panStart.x;
      const deltaY = positions.screen.y - this.panStart.y;

      if (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1) {
        if (this.panThrottleId) {
          cancelAnimationFrame(this.panThrottleId);
        }

        this.panThrottleId = requestAnimationFrame(() => {
          this.panOffset = {
            x: this.panOffset.x + deltaX,
            y: this.panOffset.y + deltaY,
          };
          this.panStart = positions.screen;
          this.renderAnimationFrame();
          this.panThrottleId = null;
        });
      }
      return;
    }

    if (this.startPoint) {
      if (this.drawThrottleId) {
        cancelAnimationFrame(this.drawThrottleId);
      }

      this.drawThrottleId = requestAnimationFrame(() => {
        this.updateDrawingCard(positions.world);
        this.drawThrottleId = null;
      });
    }
  }

  private updateDrawingCard(worldPos: FactionBoardPoint) {
    if (!this.startPoint) return;

    const x = Math.min(this.startPoint.x, worldPos.x);
    const y = Math.min(this.startPoint.y, worldPos.y);
    const width = Math.abs(worldPos.x - this.startPoint.x);
    const height = Math.abs(worldPos.y - this.startPoint.y);

    const color = "#ff6b6b";

    this.currentCard = {
      id: `temp-drawing-${Date.now()}`,
      x,
      y,
      width,
      height,
      label: "Drawing...",
      position: this.cards.length + 1,
      isTemporary: true,
      data: {
        name: "New Faction",
        color,
        race: "Unknown",
        description: "",
      },
    };

    this.render();
  }

  private handleMouseUp() {
    if (this.isPanning) {
      this.isPanning = false;
      this.panStart = null;
      this.canvas.style.cursor = "default";

      if (this.panThrottleId) {
        cancelAnimationFrame(this.panThrottleId);
        this.panThrottleId = null;
      }
      return;
    }

    if (this.isDrawing) {
      if (this.drawThrottleId) {
        cancelAnimationFrame(this.drawThrottleId);
        this.drawThrottleId = null;
      }
      this.finishDrawing();
    }

    this.canvas.style.cursor = "default";
  }

  private finishDrawing() {
    const { width = 0, height = 0 } = this.currentCard || {};
    const isTooSmall = width < 100 || height < 100;

    if (!this.currentCard || isTooSmall) {
      this.isDrawing = false;
      this.startPoint = null;
      this.currentCard = null;
      this.render();
      return null;
    }

    const newCard = { ...this.currentCard };
    this.isDrawing = false;
    this.startPoint = null;
    this.currentCard = null;

    if (this.onDrawingComplete) {
      this.onDrawingComplete(newCard);
    }

    this.render();
    return newCard;
  }

  public completeDrawing(): FactionCard | null {
    return this.finishDrawing();
  }
}
