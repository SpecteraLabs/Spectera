import { SapphireClient } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { commandPrefixSchema } from '#schemas/PrefixSchema';
import { mongo } from '#database/mongo';
import { token } from '#config/config';
import { connection } from 'mongoose';

export class ObligatorClient extends SapphireClient {
	public constructor() {
		super({
			caseInsensitivePrefixes: true,
			caseInsensitiveCommands: true,
			intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS'],
			partials: ['GUILD_MEMBER', 'CHANNEL', 'MESSAGE', 'USER', 'REACTION'],
		});
	}

	public fetchPrefix = async (message: Message) => {
		const result = await commandPrefixSchema.findOne({ id: message.guildId });
		return result ? result.prefix : '+';
	};

	public async start() {
		const response = await super.login(token);
		await mongo();
		return response;
	}

	public async destroy() {
		await connection.close();
		return super.destroy();
	}
}
