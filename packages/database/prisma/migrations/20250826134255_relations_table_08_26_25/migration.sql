-- CreateTable
CREATE TABLE "Relation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "campaignId" TEXT NOT NULL,
    "seedId" TEXT NOT NULL,
    "primaryId" TEXT NOT NULL,
    "secondaryId" TEXT NOT NULL,
    CONSTRAINT "Relation_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Relation_seedId_fkey" FOREIGN KEY ("seedId") REFERENCES "Seed" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Relation_primaryId_fkey" FOREIGN KEY ("primaryId") REFERENCES "Faction" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Relation_secondaryId_fkey" FOREIGN KEY ("secondaryId") REFERENCES "Faction" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
