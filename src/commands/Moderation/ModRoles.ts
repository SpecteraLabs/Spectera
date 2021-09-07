import { ApplyOptions } from '@sapphire/decorators';
import type { Args } from '@sapphire/framework';
import { reply } from '@sapphire/plugin-editable-commands';
import { SubCommandPluginCommand } from '@sapphire/plugin-subcommands';
import type { Message } from 'discord.js';

@ApplyOptions<SubCommandPluginCommand.Options>({
	subCommands: ['set', 'show'],
	runIn: ['GUILD_ANY'],
})
export class ModRoles extends SubCommandPluginCommand {
	public async set(message: Message, args: Args) {
		const roles = await args.repeat('role');
		for (const role of roles) {
			await this.container.database.guildSettings.update({
				where: { id: message.guild!.id },
				data: {
					modRoles: {
						push: role.id,
					},
				},
			});
		}
		await reply(message, 'Successfully set modroles for this server');
	}
}
