import { ApplyOptions } from '@sapphire/decorators';
import type { Args } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { SpecteraSubCommand } from '#structures/SpecteraSubCommand';
import { reply } from '@sapphire/plugin-editable-commands';

@ApplyOptions<SpecteraSubCommand.Options>({
	aliases: ['calc'],
	subCommands: ['add', 'subtract', 'multiply', 'divide'],
	description: 'Simple math operations',
})
export class Math extends SpecteraSubCommand {
	public async add(message: Message, args: Args) {
		const x = await args.pick('number');
		const y = await args.pick('number');
		await reply(message, { content: `The sum is **${x + y}**` });
	}

	public async subtract(message: Message, args: Args) {
		const x = await args.pick('number');
		const y = await args.pick('number');
		await reply(message, { content: `The difference is **${x - y}**` });
	}

	public async multiply(message: Message, args: Args) {
		const x = await args.pick('number');
		const y = await args.pick('number');
		await reply(message, { content: `The product is **${x * y}**` });
	}

	public async divide(message: Message, args: Args) {
		const x = await args.pick('number');
		const y = await args.pick('number');
		await reply(message, {
			content: `The quotient is **${x / y}** and remainder is **${x % y}**`,
		});
	}
}
