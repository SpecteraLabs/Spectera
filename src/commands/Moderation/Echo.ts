import { Args, Command, CommandOptions } from '@sapphire/framework';
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators';
import type { Message } from 'discord.js';

@ApplyOptions<CommandOptions>({
	aliases: ['speak', 'say', 'parrot'],
	description: 'Replies with whatever you say',
})
export class Echo extends Command {
	@RequiresUserPermissions('MANAGE_CHANNELS')
	async run(message: Message, args: Args) {
		const destination = await args
			.pick('guildTextChannel')
			.catch(() => message.channel);
		const msg = await args.rest('string');
		return destination.send({ content: msg });
	}
}
