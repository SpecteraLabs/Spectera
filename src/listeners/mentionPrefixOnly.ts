import { Listener } from '@sapphire/framework';
import { reply } from '@skyra/editable-commands';
import type { Message } from 'discord.js';

export class MentionPrefix extends Listener<'mentionPrefixOnly'> {
	public async run(message: Message) {
		const prefix = await this.container.client.fetchPrefix(message);
		await reply(message, `My prefix for this guild is ${prefix}`);
	}
}
