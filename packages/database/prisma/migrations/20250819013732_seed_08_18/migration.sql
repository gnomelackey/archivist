/*
  Warnings:

  - Added the required column `userId` to the `Seed` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Seed" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Seed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Seed" ("createdAt", "id", "type", "updatedAt", "value") SELECT "createdAt", "id", "type", "updatedAt", "value" FROM "Seed";
DROP TABLE "Seed";
ALTER TABLE "new_Seed" RENAME TO "Seed";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
