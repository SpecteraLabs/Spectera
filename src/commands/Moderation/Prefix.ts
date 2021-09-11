import { SpecteraSubCommand } from '#structures/SpecteraSubCommand';
import { PermissionLevels } from '#types/enums/PermissionLevels';
import { ApplyOptions } from '@sapphire/decorators';
import type { Args } from '@sapphire/framework';
import { reply } from '@sapphire/plugin-editable-commands';
import type { Message } from 'discord.js';

@ApplyOptions<SpecteraSubCommand.Options>({
	subCommands: ['set', 'remove', 'show'],
	description: 'prefix configuration for your server',
	permissionLevel: PermissionLevels.Moderator
})
export class Prefix extends SpecteraSubCommand {
	public async show(message: Message) {
		const result = await this.container.database.guildSettings.findUnique({
			where: { id: message.guild!.id }
		});
		await reply(message, {
			content: `Prefix for this guild is ${result!.prefix}`
		});
	}

	public async set(message: Message, args: Args) {
		let prefix = await args.pick('string');
		prefix = prefix.toLowerCase();
		await this.container.database.guildSettings.update({
			where: { id: message.guild!.id },
			data: { prefix }
		});
		await reply(message, {
			content: `Successfully changed prefix of this guild`
		});
	}

	public async remove(message: Message) {
		await this.container.database.guildSettings.delete({
			where: { id: message.guild!.id }
		});
		await reply(message, {
			content: 'Successfully removed prefix of this guild'
		});
	}
}
