/*
  Warnings:

  - Added the required column `category` to the `ArticleStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `ArticleStats` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ArticleStats" (
    "slug" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_ArticleStats" ("slug", "updatedAt", "views") SELECT "slug", "updatedAt", "views" FROM "ArticleStats";
DROP TABLE "ArticleStats";
ALTER TABLE "new_ArticleStats" RENAME TO "ArticleStats";
CREATE INDEX "ArticleStats_category_idx" ON "ArticleStats"("category");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
