import { buildPhishLog, uriRegex } from '#lib/constants';
import { PHISHERMAN_KEY } from '#root/config';
import { ApplyOptions } from '@sapphire/decorators';
import { Listener, ListenerOptions } from '@sapphire/framework';
import { checkDomain } from '@sapphire/phisherman';
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
			const check = await checkDomain(uri, PHISHERMAN_KEY);

			if (check.isScam) {
				await message.delete();
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
