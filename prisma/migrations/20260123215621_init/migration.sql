-- CreateTable
CREATE TABLE "ArticleStats" (
    "slug" TEXT NOT NULL PRIMARY KEY,
    "views" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" DATETIME NOT NULL
);
