import { buildPhishLog, phisherFetch, uriRegex } from '#lib/constants';
import { isScam } from '#lib/utils/util';
import { PHISHERMAN_KEY } from '#root/config';
import { ApplyOptions } from '@sapphire/decorators';
import { fetch } from '@sapphire/fetch';
import { Listener, ListenerOptions } from '@sapphire/framework';
import type { Message, TextChannel } from 'discord.js';

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
			const check = await fetch<phisherFetch>(`https://api.phisherman.gg/v2/domains/check/${uri}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${PHISHERMAN_KEY}`
				}
			});
			if (isScam(check.classification)) {
				await message.delete();
				// await fetch(
				// 	`https://api.phisherman.gg/v1/domains/${uri}`,
				// 	{
				// 		method: FetchMethods.Put,
				// 		headers: {
				// 			'Content-Type': 'application/json',
				// 			Authorization: `Bearer ${PHISHERMAN_KEY}`
				// 		},
				// 		body: JSON.stringify({
				// 			guild: message.guild.id
				// 		})
				// 	},
				// 	FetchResultTypes.Result
				// );
				const result = await this.container.database.guildLogs.findUnique({
					where: {
						id: message.guild.id
					}
				});
				if (!result || !result.phishLogChannel) return;
				const channel = await message.guild.channels.fetch(result.phishLogChannel);
				if (!channel) return;
				const embed = buildPhishLog(message, uri, check.classification);
				await (channel as TextChannel).send({ embeds: [embed] });
			}
		} catch (error) {
			this.container.logger.error(error);
		}
	}
}
