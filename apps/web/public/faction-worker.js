/**
 * Web Worker for handling faction board computations
 * Processes card positioning, overlap detection, and rendering operations in a background thread
 * to maintain smooth UI performance during intensive calculations
 */

let panThrottleId = null;

self.onmessage = function(e) {
  const { type, data } = e.data;

  switch (type) {
    case 'CALCULATE_CARD_POSITIONS':
      calculateCardPositions(data);
      break;
    case 'CALCULATE_OVERLAPS':
      calculateOverlaps(data);
      break;
    case 'BUILD_FACTION_CARDS':
      buildFactionCards(data);
      break;
    case 'RENDER_TO_OFFSCREEN':
      renderToOffscreen(data);
      break;
    case 'THROTTLED_PAN_UPDATE':
      handleThrottledPanUpdate(data);
      break;
  }
};

/**
 * Handles throttled pan update operations to maintain smooth panning performance
 * @param {Object} data - Pan update data
 */
function handleThrottledPanUpdate(data) {
  if (panThrottleId) {
    clearTimeout(panThrottleId);
  }
  
  panThrottleId = setTimeout(() => {
    self.postMessage({
      type: 'THROTTLEDPANUPDATE_CALCULATED',
      data: data
    });
    panThrottleId = null;
  }, 16);
}

/**
 * Calculates optimal positions for faction cards based on faction data
 * @param {Object} data - Object containing factions array
 * @param {Array} data.factions - Array of faction objects with coordinate data
 */
function calculateCardPositions(data) {
  const { factions } = data;
  
  const cards = factions.map((faction, index) => {
    const coordinates = faction.coordinates?.[0];
    if (!coordinates) return null;

    const x = coordinates.x;
    const y = coordinates.y;
    const width = coordinates.width;
    const height = coordinates.height;
    
    const fullName = `${faction.name} (${faction.race})`;
    const label = fullName.length > 20 ? fullName.substring(0, 17) + "..." : fullName;

    return {
      id: faction.id,
      x,
      y,
      width,
      height,
      label,
      position: index,
      isTemporary: false,
      data: {
        id: faction.id,
        name: faction.name,
        race: faction.race,
        color: faction.color,
        description: faction.description || "",
      }
    };
  }).filter(Boolean);

  self.postMessage({
    type: 'CALCULATECARDPOSITIONS_CALCULATED',
    data: { cards }
  });
}

/**
 * Calculates overlaps between existing cards and a new card
 * @param {Object} data - Object containing cards and newCard
 * @param {Array} data.cards - Array of existing faction cards
 * @param {Object} data.newCard - The new card to check for overlaps
 */
function calculateOverlaps(data) {
  const { cards, newCard } = data;
  
  const overlaps = cards.reduce((acc, card) => {
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

      if (overlapWidth > 0 && overlapHeight > 0) {
        const overlapCenterX = overlapLeft + overlapWidth / 2;
        const overlapCenterY = overlapTop + overlapHeight / 2;

        acc.push({
          cardId: card.id,
          newCardId: newCard.id,
          centerX: overlapCenterX,
          centerY: overlapCenterY
        });
      }
    }

    return acc;
  }, []);

  self.postMessage({
    type: 'CALCULATEOVERLAPS_CALCULATED',
    data: { overlaps }
  });
}

/**
 * Builds faction cards from faction data for processing
 * @param {Object} data - Object containing factions array
 * @param {Array} data.factions - Array of faction objects to process
 */
function buildFactionCards(data) {
  const { factions } = data;
  
  const processedCards = factions.map((faction) => {
    return {
      id: faction.id,
      processed: true,
    };
  });

  self.postMessage({
    type: 'BUILDFACTIONCARDS_CALCULATED',
    data: { processedCards }
  });
}

/**
 * Renders faction cards to an offscreen canvas for improved performance
 * @param {Object} data - Rendering data object
 * @param {HTMLCanvasElement} data.canvas - The canvas element to render to
 * @param {Array} data.cards - Array of faction cards to render
 * @param {Object} data.panOffset - Current pan offset {x, y}
 * @param {Object} data.currentCard - Currently drawing card (optional)
 * @param {boolean} data.isDrawing - Whether currently in drawing mode
 */
function renderToOffscreen(data) {
  const { canvas, cards, panOffset, currentCard, isDrawing } = data;
  
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(panOffset.x, panOffset.y);

  ctx.imageSmoothingEnabled = false;
  
  ctx.font = "16px sans-serif";
  ctx.lineWidth = 2;

  cards.forEach((card) => {
    const borderColor = card.data.color + "FF";
    const fillColor = card.data.color + "40";

    ctx.fillStyle = fillColor;
    ctx.fillRect(card.x, card.y, card.width, card.height);

    ctx.strokeStyle = borderColor;
    ctx.strokeRect(card.x, card.y, card.width, card.height);

    ctx.fillStyle = borderColor;
    ctx.fillRect(card.x - 1, card.y - 26, card.width + 2, 25);

    ctx.fillStyle = getContrastTextColor(card.data.color);
    ctx.fillText(card.label, card.x + 10, card.y - 6);
  });

  if (isDrawing && currentCard) {
    const { height = 0, width = 0 } = currentCard;
    const hasSize = width > 0 && height > 0;

    if (hasSize) {
      ctx.fillStyle = currentCard.data.color + "4D";
      ctx.fillRect(currentCard.x, currentCard.y, currentCard.width, currentCard.height);
      
      ctx.strokeStyle = currentCard.data.color;
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(currentCard.x, currentCard.y, currentCard.width, currentCard.height);
      ctx.setLineDash([]);
    }
  }

  ctx.restore();

  self.postMessage({
    type: 'RENDER_COMPLETE',
    data: {}
  });
}

/**
 * Determines the best contrasting text color (white or black) for a given background color
 * @param {string} hexColor - Background hex color string
 * @returns {string} "#000000" for black text or "#FFFFFF" for white text
 */
function getContrastTextColor(hexColor) {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? '#000000' : '#FFFFFF';
}
