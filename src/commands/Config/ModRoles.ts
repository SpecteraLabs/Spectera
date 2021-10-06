import { SpecteraCommand } from '#structures/SpecteraCommand';
import { PermissionLevels } from '#types/enums/PermissionLevels';
import { ApplyOptions } from '@sapphire/decorators';
import type { Args } from '@sapphire/framework';
import { reply } from '@sapphire/plugin-editable-commands';
import type { Message } from 'discord.js';

@ApplyOptions<SpecteraCommand.Options>({
	subCommands: ['set', 'show'],
	runIn: ['GUILD_ANY'],
	description: "let's you set modroles for your server",
	permissionLevel: PermissionLevels.Administrator
})
export class ModRoles extends SpecteraCommand {
	public async set(message: Message, args: Args) {
		const roles = await args.repeat('role');
		for (const role of roles) {
			const condition = await this.container.database.guildSettings.findUnique({ where: { id: message.guild!.id } });
			if (condition!.modRoles.includes(role.id)) return;
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
