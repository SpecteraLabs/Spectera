/*
  Warnings:

  - You are about to drop the column `loggingChannel` on the `GuildSettings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GuildSettings" DROP COLUMN "loggingChannel";

-- CreateTable
CREATE TABLE "GuildLogs" (
    "id" TEXT NOT NULL,
    "messageLogChannel" TEXT NOT NULL,
    "modLogChannel" TEXT NOT NULL,
    "memberLogChannel" TEXT NOT NULL,
    "phishLogChannel" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "GuildLogs_id_key" ON "GuildLogs"("id");
