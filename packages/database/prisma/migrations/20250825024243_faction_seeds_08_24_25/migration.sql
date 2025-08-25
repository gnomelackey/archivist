-- CreateTable
CREATE TABLE "_FactionToSeed" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_FactionToSeed_A_fkey" FOREIGN KEY ("A") REFERENCES "Faction" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FactionToSeed_B_fkey" FOREIGN KEY ("B") REFERENCES "Seed" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_FactionToSeed_AB_unique" ON "_FactionToSeed"("A", "B");

-- CreateIndex
CREATE INDEX "_FactionToSeed_B_index" ON "_FactionToSeed"("B");
