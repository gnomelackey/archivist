-- CreateTable
CREATE TABLE "FactionTrade" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "campaignId" TEXT NOT NULL,
    "seedAId" TEXT NOT NULL,
    "seedBId" TEXT NOT NULL,
    "partyAId" TEXT NOT NULL,
    "partyBId" TEXT NOT NULL,
    CONSTRAINT "FactionTrade_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FactionTrade_seedAId_fkey" FOREIGN KEY ("seedAId") REFERENCES "Seed" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FactionTrade_seedBId_fkey" FOREIGN KEY ("seedBId") REFERENCES "Seed" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FactionTrade_partyAId_fkey" FOREIGN KEY ("partyAId") REFERENCES "Faction" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FactionTrade_partyBId_fkey" FOREIGN KEY ("partyBId") REFERENCES "Faction" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FactionAlliance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reason" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "campaignId" TEXT NOT NULL,
    "seedId" TEXT NOT NULL,
    "partyAId" TEXT NOT NULL,
    "partyBId" TEXT NOT NULL,
    CONSTRAINT "FactionAlliance_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FactionAlliance_seedId_fkey" FOREIGN KEY ("seedId") REFERENCES "Seed" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FactionAlliance_partyAId_fkey" FOREIGN KEY ("partyAId") REFERENCES "Faction" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FactionAlliance_partyBId_fkey" FOREIGN KEY ("partyBId") REFERENCES "Faction" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FactionAlliance" ("campaignId", "createdAt", "id", "partyAId", "partyBId", "reason", "seedId", "updatedAt") SELECT "campaignId", "createdAt", "id", "partyAId", "partyBId", "reason", "seedId", "updatedAt" FROM "FactionAlliance";
DROP TABLE "FactionAlliance";
ALTER TABLE "new_FactionAlliance" RENAME TO "FactionAlliance";
CREATE TABLE "new_FactionConflict" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reason" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "campaignId" TEXT NOT NULL,
    "seedId" TEXT NOT NULL,
    "aggressorId" TEXT NOT NULL,
    "defenderId" TEXT NOT NULL,
    CONSTRAINT "FactionConflict_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FactionConflict_seedId_fkey" FOREIGN KEY ("seedId") REFERENCES "Seed" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FactionConflict_aggressorId_fkey" FOREIGN KEY ("aggressorId") REFERENCES "Faction" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FactionConflict_defenderId_fkey" FOREIGN KEY ("defenderId") REFERENCES "Faction" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FactionConflict" ("aggressorId", "campaignId", "createdAt", "defenderId", "id", "reason", "seedId", "updatedAt") SELECT "aggressorId", "campaignId", "createdAt", "defenderId", "id", "reason", "seedId", "updatedAt" FROM "FactionConflict";
DROP TABLE "FactionConflict";
ALTER TABLE "new_FactionConflict" RENAME TO "FactionConflict";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
