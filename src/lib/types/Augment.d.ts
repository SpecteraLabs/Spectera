import type { PrismaClient } from '@prisma/client';
import type { Collection } from 'discord.js';
import type { SnipedMessageObject } from './interfaces/Snipe';

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

	interface SapphireClient {
		snipes: Collection<string, SnipedMessageObject>
	}
}
