import { Listener } from '@sapphire/framework';
import { reply } from '@sapphire/plugin-editable-commands';
import type { Message } from 'discord.js';

export class MentionPrefix extends Listener<'mentionPrefixOnly'> {
	public async run(message: Message) {
		const result = await this.container.database.guildSettings.findUnique({ where: { id: message.guild!.id } });
		await reply(message, `My prefixes for this guild is \`${result?.prefixes.join(' ,')}\``);
	}
}
