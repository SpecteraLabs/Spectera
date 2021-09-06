-- CreateTable
CREATE TABLE "GuildSettings" (
    "id" TEXT NOT NULL,
    "prefix" TEXT NOT NULL DEFAULT E's!',
    "autorole" TEXT,
    "loggingChannel" TEXT NOT NULL,
    "muterole" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "GuildSettings.id_unique" ON "GuildSettings"("id");
