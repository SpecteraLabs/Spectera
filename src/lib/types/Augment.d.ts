import type { PrismaClient } from '@prisma/client';
import type { TagParser } from '@spectera/tag-parser';
import type { Collection } from 'discord.js';
import type { SnipedMessageObject } from './interfaces/Snipe';

declare module '@sapphire/pieces' {
	interface Container {
		database: PrismaClient;
		parser: TagParser;
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
		duration: string;
	}
}

declare module 'discord.js' {
	interface Client {
		snipes: Collection<string, SnipedMessageObject>;
	}
}

export type Snowflake = `${bigint}`;
