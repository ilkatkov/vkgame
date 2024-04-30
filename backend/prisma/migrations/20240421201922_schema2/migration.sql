/*
  Warnings:

  - The values [CARDS] on the enum `GameType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `icon` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `themeId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `welcomeDescription` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the `Card` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Theme` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `background` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logoURL` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `welcomeBody` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "GameType_new" AS ENUM ('CLASSIC', 'MATCHCARDS');
ALTER TABLE "Game" ALTER COLUMN "gameType" TYPE "GameType_new" USING ("gameType"::text::"GameType_new");
ALTER TYPE "GameType" RENAME TO "GameType_old";
ALTER TYPE "GameType_new" RENAME TO "GameType";
DROP TYPE "GameType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_gameId_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_themeId_fkey";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "icon",
DROP COLUMN "themeId",
DROP COLUMN "title",
DROP COLUMN "welcomeDescription",
ADD COLUMN     "background" INTEGER NOT NULL,
ADD COLUMN     "leaveBody" TEXT,
ADD COLUMN     "leaveTitle" TEXT,
ADD COLUMN     "leaveURL" TEXT,
ADD COLUMN     "logoURL" TEXT NOT NULL,
ADD COLUMN     "rounds" INTEGER,
ADD COLUMN     "subject" TEXT NOT NULL,
ADD COLUMN     "welcomeBody" TEXT NOT NULL;

-- DropTable
DROP TABLE "Card";

-- DropTable
DROP TABLE "Theme";

-- DropEnum
DROP TYPE "FillType";

-- CreateTable
CREATE TABLE "ClassicCard" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "term" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ClassicCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchCard" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "imageURL" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,

    CONSTRAINT "MatchCard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClassicCard" ADD CONSTRAINT "ClassicCard_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchCard" ADD CONSTRAINT "MatchCard_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
