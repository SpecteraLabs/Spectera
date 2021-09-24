import { ApplyOptions } from '@sapphire/decorators';
import { SpecteraCommand } from '#structures/SpecteraCommand';
import type { Message } from 'discord.js';
import type { Args } from '@sapphire/framework';

@ApplyOptions<SpecteraCommand.Options>({
	description: 'Your description here.',
})

export class test extends SpecteraCommand {
	public async run(message: Message, args: Args) {
		// ...
	}
}