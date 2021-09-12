/*
  Warnings:

  - The `prefix` column on the `GuildSettings` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "GuildSettings" DROP COLUMN "prefix",
ADD COLUMN     "prefix" TEXT[];

-- RenameIndex
ALTER INDEX "GuildSettings.id_unique" RENAME TO "GuildSettings_id_key";
