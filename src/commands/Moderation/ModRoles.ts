import { SpecteraSubCommand } from '#structures/SpecteraSubCommand';
import { PermissionLevels } from '#types/enums/PermissionLevels';
import { ApplyOptions } from '@sapphire/decorators';
import type { Args } from '@sapphire/framework';
import { reply } from '@sapphire/plugin-editable-commands';
import type { Message } from 'discord.js';

@ApplyOptions<SpecteraSubCommand.Options>({
	subCommands: ['set', 'show'],
	runIn: ['GUILD_ANY'],
	permissionLevel: PermissionLevels.Administrator
})
export class ModRoles extends SpecteraSubCommand {
	public async set(message: Message, args: Args) {
		const roles = await args.repeat('role');
		for (const role of roles) {
			await this.container.database.guildSettings.update({
				where: { id: message.guild!.id },
				data: {
					modRoles: {
						push: role.id
					}
				}
			});
		}
		await reply(message, 'Successfully set modroles for this server');
	}
}
