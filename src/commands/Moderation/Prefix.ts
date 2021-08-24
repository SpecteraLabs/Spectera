import { ApplyOptions } from '@sapphire/decorators';
import { Args } from '@sapphire/framework';
import { SubCommandPluginCommand } from '@sapphire/plugin-subcommands';
import { Message } from 'discord.js';
import { commandPrefixSchema } from '../../database/schemas/PrefixSchema';
import { SchemaOutput } from '../../lib/types/interfaces/SchemaOutput';

@ApplyOptions<SubCommandPluginCommand.Options>({
	subCommands: ['set', 'remove', 'show'],
})
export class Prefix extends SubCommandPluginCommand {
	public async show(message: Message) {
		const result: SchemaOutput =
			await commandPrefixSchema.findOne({ _id: message.guildId });
		await message.reply({ content: `Prefix for this guild is ${result.prefix ?? '+'}` });
	}
	public async set(message: Message, args: Args) {
		let prefix = await args.pick('string');
		await message.guild.me.setNickname(`[${prefix}] Obligator`);
		prefix = prefix.toLowerCase();
		await commandPrefixSchema.findOneAndUpdate(
			{
				_id: message.guildId,
			},
			{
				_id: message.guildId,
				prefix,
			},
			{
				upsert: true,
			}
		);
		await message.reply({
			content: `Successfully changed prefix of this guild`,
		});
	}
	public async remove(message: Message) {
		await commandPrefixSchema.findOneAndRemove({ _id: message.guildId }).then(async () => {
			message.reply({ content: 'Successfully removed prefix of this guild' });
			await message.guild.me.setNickname(`[+] Obligator`);
		});
	}
}
