/*
  Warnings:

  - You are about to drop the `Relation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Relation";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "FactionRelation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "campaignId" TEXT NOT NULL,
    "seedId" TEXT NOT NULL,
    "partyAId" TEXT NOT NULL,
    "partyBId" TEXT NOT NULL,
    CONSTRAINT "FactionRelation_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FactionRelation_seedId_fkey" FOREIGN KEY ("seedId") REFERENCES "Seed" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FactionRelation_partyAId_fkey" FOREIGN KEY ("partyAId") REFERENCES "Faction" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FactionRelation_partyBId_fkey" FOREIGN KEY ("partyBId") REFERENCES "Faction" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
