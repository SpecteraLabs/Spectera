/* eslint-disable no-useless-return */
import { isNullishOrEmpty } from '@sapphire/utilities';
import { ApplyOptions } from '@sapphire/decorators';
import { from, Listener, ListenerOptions } from '@sapphire/framework';
import type { Message } from 'discord.js';
import type { Tag } from '#types/interfaces/Tag';
import { VM } from 'vm2';

@ApplyOptions<ListenerOptions>({
	name: 'tagHandler',
	event: 'messageCreate'
})
export class TagHandler extends Listener {
	public async run(message: Message) {
		const result = await this.container.database.guildSettings.findUnique({
			where: { id: message.guild!.id }
		})!;
		const vm = new VM({
			sandbox: {
				console,
				message
			}
		});
		if (isNullishOrEmpty(result!.tags)) return;
		const tags = result!.tags.map((tag) => this.parseJSON<Tag>(tag));
		const prefixes = (await this.container.client.fetchPrefix(message)) as string[];
		if (!prefixes.some((prefix) => message.content.startsWith(prefix))) return;
		let matchedTag: Tag;
		if (
			tags.some((tag) => {
				if (message.content.includes(tag!.name)) {
					matchedTag = tag!;
					return true;
				}
				return false;
			})
		) {
			const name = message.content.split(matchedTag!.name);
			if (!prefixes.includes(name[0])) return;
			try {
				vm.run(matchedTag!.run);
			} catch (e) {
				this.container.logger.error(e);
			}
		}
	}

	private parseJSON<T>(body: string) {
		try {
			// eslint-disable-next-line func-names
			return JSON.parse(body) as T;
		} catch (_: unknown) {
			return null;
		}
	}
}
