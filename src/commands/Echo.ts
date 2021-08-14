import { Args, Command, CommandOptions } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';
import type { Message } from 'discord.js';

@ApplyOptions<CommandOptions>({
	name: 'echo',
	aliases: ['speak', 'say', 'parrot'],
	description: 'Replies with whatever you say',
})
export class Echo extends Command {
	async run(message: Message, args: Args) {
		const destination = await args
			.pick('guildTextChannel')
			.catch(() => message.channel);
		const msg = await args.rest('string');
		destination.send({ content: msg });
	}
}
