-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "fplTeamId" INTEGER,
    "fplTeamName" TEXT,
    "subscription" TEXT NOT NULL DEFAULT 'FREE',
    "subscriptionEnds" DATETIME,
    "aiCallsThisMonth" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "TeamHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "gameweek" INTEGER NOT NULL,
    "totalPoints" INTEGER NOT NULL,
    "rank" INTEGER,
    "overallRank" INTEGER,
    "teamValue" REAL NOT NULL,
    "captain" TEXT NOT NULL,
    "chipUsed" TEXT,
    CONSTRAINT "TeamHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Recommendation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "gameweek" INTEGER NOT NULL,
    "data" TEXT NOT NULL,
    "reasoning" TEXT NOT NULL,
    "confidence" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Recommendation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SpyReport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "spyId" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "intel" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SpyReport_spyId_fkey" FOREIGN KEY ("spyId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SpyReport_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Territory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "attackerId" TEXT NOT NULL,
    "defenderId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "attackerPts" INTEGER,
    "defenderPts" INTEGER,
    "margin" INTEGER,
    "debtCarried" INTEGER NOT NULL DEFAULT 0,
    "gameweek" INTEGER NOT NULL,
    CONSTRAINT "Territory_attackerId_fkey" FOREIGN KEY ("attackerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Territory_defenderId_fkey" FOREIGN KEY ("defenderId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_fplTeamId_key" ON "User"("fplTeamId");

-- CreateIndex
CREATE UNIQUE INDEX "TeamHistory_userId_gameweek_key" ON "TeamHistory"("userId", "gameweek");
