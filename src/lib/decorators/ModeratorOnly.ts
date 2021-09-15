import { createFunctionPrecondition } from '@sapphire/decorators';
import { container } from '@sapphire/framework';
import type { Message } from 'discord.js';

export function ModeratorOnly(): MethodDecorator {
	return createFunctionPrecondition(async (message: Message) => {
		const result = await container.database.guildSettings.findUnique({
			where: { id: message.guild!.id }
		});
		if (!message.member!.roles.cache.some((role) => result!.modRoles.includes(role.id))) {
			message.reply('This command can only run by Moderators!');
		}
		return message.member!.roles.cache.some((role) => result!.modRoles.includes(role.id));
	});
}
