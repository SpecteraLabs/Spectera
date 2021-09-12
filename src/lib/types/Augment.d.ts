import type { PrismaClient } from '@prisma/client';

declare module '@sapphire/pieces' {
	interface Container {
		database: PrismaClient;
	}
}

declare module '@sapphire/framework' {
	interface Preconditions {
		Administrator: never;
		BotOwner: never;
		Moderator: never;
		NewsOnly: never;
		TextOnly: never;
	}
	interface ArgType {
		emoji: string;
	}
}
