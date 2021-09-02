import type { Database } from 'database/Database';

declare module '@sapphire/pieces' {
	interface Container {
		database: Database;
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
}
