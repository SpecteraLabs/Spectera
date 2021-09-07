import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators';
import type { Message } from 'discord.js';
import { SpecteraCommand } from '#structures/SpecteraCommand';

@ApplyOptions<SpecteraCommand.Options>({
	aliases: ['speak', 'say', 'parrot'],
	description: 'Replies with whatever you say',
	bucket: 1,
	cooldown: 10000,
	runIn: ['GUILD_TEXT'],
})
export class Echo extends SpecteraCommand {
	@RequiresUserPermissions('MANAGE_CHANNELS')
	public async run(message: Message, args: SpecteraCommand.Args) {
		const destination = await args
			.pick('guildTextChannel')
			.catch(() => message.channel);
		const msg = await args.rest('string');
		return destination.send({ content: msg });
	}
}
