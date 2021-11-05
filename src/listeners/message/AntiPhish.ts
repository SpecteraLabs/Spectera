import { uriRegex } from '#lib/constants';
import { ApplyOptions } from '@sapphire/decorators';
import { fetch } from '@sapphire/fetch';
import { Listener, ListenerOptions } from '@sapphire/framework';
import type { Message } from 'discord.js';

@ApplyOptions<ListenerOptions>({
	event: 'messageCreate',
	name: 'anti-phish'
})
export class UserEvent extends Listener {
	public async run(message: Message) {
		if (message.author.bot) return;
		if (!message.content.match(uriRegex)) return;
		const uri: string | RegExpExecArray = uriRegex.exec(message.content)!;
		const check = await fetch(`https://api.phisherman.gg/v1/domains/${uri[0].replace('www.', '')}`);
		if (check) {
			await message.delete();
			// TODO: Add logging for this
		}
	}
}
