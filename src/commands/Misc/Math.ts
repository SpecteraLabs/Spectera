import { ApplyOptions } from '@sapphire/decorators';
import { Args } from '@sapphire/framework';
import { Message } from 'discord.js';
import { SubCommandPluginCommand } from '@sapphire/plugin-subcommands';

@ApplyOptions<SubCommandPluginCommand.Options>({
	aliases: ['calc'],
	subCommands: ['add', 'subtract', 'multiply', 'divide'],
	description: 'Simple math operations',
})
export class Math extends SubCommandPluginCommand {
	public async add(message: Message, args: Args) {
		const x = await args.pick('number');
		const y = await args.pick('number');
		await message.reply({ content: `The sum is **${x + y}**` });
	}
	public async subtract(message: Message, args: Args) {
		const x = await args.pick('number');
		const y = await args.pick('number');
		await message.reply({ content: `The difference is **${x - y}**` });
	}
	public async multiply(message: Message, args: Args) {
		const x = await args.pick('number');
		const y = await args.pick('number');
		await message.reply({ content: `The product is **${x * y}**` });
	}
	public async divide(message: Message, args: Args) {
		const x = await args.pick('number');
		const y = await args.pick('number');
		await message.reply({
			content: `The quotient is **${x / y}** and remainder is **${x % y}**`,
		});
	}
}
