import { uriRegex } from '#lib/constants';
import { PHISHERMAN_KEY } from '#root/config';
import { ApplyOptions } from '@sapphire/decorators';
import { fetch, FetchMethods, FetchResultTypes } from '@sapphire/fetch';
import { Listener, ListenerOptions } from '@sapphire/framework';
import type { Message } from 'discord.js';

@ApplyOptions<ListenerOptions>({
	event: 'messageCreate',
	name: 'anti-phish'
})
export class AntiPhishEvent extends Listener {
	public async run(message: Message) {
		if (message.author.bot) return;
		if (!message.guild) return;
		if (!message.content.match(uriRegex)) return;
		try {
			const execedUri: string | RegExpExecArray = uriRegex.exec(message.content)!;
			const uri = execedUri[0].replace('www.', '');
			const check = await fetch(`https://api.phisherman.gg/v1/domains/${uri}`);
			if (check) {
				await message.delete();
				await fetch(
					`https://api.phisherman.gg/v1/domains/${uri}`,
					{
						method: FetchMethods.Put,
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${PHISHERMAN_KEY}`
						},
						body: JSON.stringify({
							guild: message.guild.id
						})
					},
					FetchResultTypes.Result
				);
				// TODO: Add logging for this
			}
		} catch (error) {
			this.container.logger.error(error);
		}
	}
}
