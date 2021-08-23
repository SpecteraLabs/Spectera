import { ApplyOptions } from '@sapphire/decorators';
import { Args } from '@sapphire/framework';
import { SubCommandPluginCommand } from '@sapphire/plugin-subcommands';
import { Message } from 'discord.js';
import { commandPrefixSchema } from '../../database/schemas/PrefixSchema';

@ApplyOptions<SubCommandPluginCommand.Options>({
	subCommands: ['set', 'remove', 'show'],
})
export class Prefix extends SubCommandPluginCommand {
	public async set(message: Message, args: Args) {
		/* empty for now */ console.log(message, args);
	}
	public async show(message: Message) {
		const prefix =
			(await commandPrefixSchema.findOne({ _id: message.guildId })) ?? '+';
		await message.reply({ content: `Prefix for this guild is ${prefix}` });
	}
}
