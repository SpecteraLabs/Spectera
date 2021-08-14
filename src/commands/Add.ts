import { ApplyOptions } from '@sapphire/decorators';
import {
	Args,
	Command,
	CommandOptions,
	PieceContext,
} from '@sapphire/framework';
import { Message } from 'discord.js';

@ApplyOptions<CommandOptions>({
	name: 'add',
	description: 'Adds two numbers',
})
export class Add extends Command {
	async run(message: Message, args: Args) {
		const x = await args.pick('number');
		const y = await args.pick('number');
		return message.reply(`The result is ${x + y}!`);
	}
}
