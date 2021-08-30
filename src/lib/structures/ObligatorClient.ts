import { SapphireClient } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { commandPrefixSchema } from '#schemas/PrefixSchema';
import { connection } from 'mongoose';
import { Database } from '#database/Database';
import { CLIENT_OPTIONS } from '../../config';

export class ObligatorClient extends SapphireClient {
	public constructor() {
		super(CLIENT_OPTIONS);
	}

	public fetchPrefix = async (message: Message) => {
		const result = await commandPrefixSchema.findOne({
			_id: message.guildId,
		});
		return result ? result.prefix : '+';
	};

	public async start() {
		const response = await super.login();
		await Database.connect();
		return response;
	}

	public async destroy() {
		await connection.close();
		return super.destroy();
	}
}
