/* eslint-disable no-useless-return */
import { isNullishOrEmpty } from '@sapphire/utilities';
import { ApplyOptions } from '@sapphire/decorators';
import { Listener, ListenerOptions } from '@sapphire/framework';
import type { Message } from 'discord.js';
import type { Tag } from '#types/interfaces/Tag';

@ApplyOptions<ListenerOptions>({
	name: 'tagHandler',
	event: 'messageCreate'
})
export class TagHandler extends Listener {
	public async run(message: Message) {
		const result = await this.container.database.guildSettings.findUnique({
			where: { id: message.guild!.id }
		})!;
		if (isNullishOrEmpty(result!.tags)) return;
		const tags = result!.tags.map((tag) => JSON.parse(tag));
		const prefixes = (await this.container.client.fetchPrefix(message)) as string[];
		if (!prefixes.some((prefix) => message.content.startsWith(prefix))) return;
		let matchedTag: Tag;
		if (
			tags.some((tag) => {
				if (message.content.includes(tag.name)) {
					matchedTag = tag;
					return true;
				}
				return false;
			})
		) {
			const name = message.content.split(matchedTag!.name);
			if (!prefixes.includes(name[0])) return;
			// @ts-expect-error it is initialized
			// eslint-disable-next-line no-eval
			eval(matchedTag.run);
		}
	}
}
