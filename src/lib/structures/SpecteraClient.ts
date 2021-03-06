import { SapphireClient, container } from '@sapphire/framework';
import { Collection, Message } from 'discord.js';
import { CLIENT_OPTIONS } from '#root/config';
import type { SnipedMessageObject } from '#types/interfaces/Snipe';

export class SpecteraClient extends SapphireClient {
	public snipes: Collection<string, SnipedMessageObject> = new Collection();
	public constructor() {
		super(CLIENT_OPTIONS);
		container.client = this;
	}

	public fetchPrefix = async (message: Message) => {
		if (!message.guild) return ['s!'];
		const result = await container.database.guildSettings.findUnique({
			where: { id: message.guild.id }
		});
		return result!.prefixes.length ? result!.prefixes : ['s!'];
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
