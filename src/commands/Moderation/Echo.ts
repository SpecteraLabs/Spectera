import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators';
import type { Message } from 'discord.js';
import { ObligatorCommand } from '../../lib/structures/ObligatorCommand';

@ApplyOptions<ObligatorCommand.Options>({
	aliases: ['speak', 'say', 'parrot'],
	description: 'Replies with whatever you say',
})
export class Echo extends ObligatorCommand {
	@RequiresUserPermissions('MANAGE_CHANNELS')
	public async run(message: Message, args: ObligatorCommand.Args) {
		const destination = await args
			.pick('guildTextChannel')
			.catch(() => message.channel);
		const msg = await args.rest('string');
		return destination.send({ content: msg });
	}
}
