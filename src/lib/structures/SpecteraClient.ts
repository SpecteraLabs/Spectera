import { SapphireClient, container } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { CLIENT_OPTIONS } from '#root/config';

export class SpecteraClient extends SapphireClient {
	public constructor() {
		super(CLIENT_OPTIONS);
	}

	public fetchPrefix = async (message: Message) => {
		if (!message.guild) return 's!';
		const result = await container.database.guildSettings.findUnique({
			where: { id: message.guild.id },
		});
		return result ? result.prefix : 's!';
	};

	public async start() {
		const response = await super.login();
		return response;
	}

	public async destroy() {
		await container.database.$disconnect();
		return super.destroy();
	}
}
