import { SapphireClient } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { commandPrefixSchema } from '#schemas/PrefixSchema';
import { connection } from 'mongoose';
import { token } from '#config/config';
import { Database } from '#database/Database';

export class ObligatorClient extends SapphireClient {
	public constructor() {
		super({
			fetchPrefix: async (message: Message) => {
				const result = await commandPrefixSchema.findOne({
					_id: message.guildId,
				});
				return result ? result.prefix : '+';
			},
			caseInsensitivePrefixes: true,
			caseInsensitiveCommands: true,
			intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS'],
			partials: ['GUILD_MEMBER', 'CHANNEL', 'MESSAGE', 'USER', 'REACTION'],
		});
	}

	public async start() {
		const response = await super.login(token);
		await Database.connect();
		return response;
	}

	public async destroy() {
		await connection.close();
		return super.destroy();
	}
}
