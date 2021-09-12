/*
  Warnings:

  - You are about to drop the column `prefix` on the `GuildSettings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GuildSettings" DROP COLUMN "prefix",
ADD COLUMN     "prefixes" TEXT[];
