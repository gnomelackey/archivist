/*
  Warnings:

  - A unique constraint covering the columns `[name,race]` on the table `Faction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Faction_name_race_key" ON "Faction"("name", "race");
