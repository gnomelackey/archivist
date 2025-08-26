/*
  Warnings:

  - You are about to drop the `FactionRelation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "FactionRelation";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "FactionAlliance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reason" TEXT NOT NULL,
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

-- CreateTable
CREATE TABLE "FactionConflict" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reason" TEXT NOT NULL,
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
