import { OWNERS } from '#root/config';
import { createFunctionPrecondition } from '@sapphire/decorators';
import { container, UserError } from '@sapphire/framework';
import type { Message } from 'discord.js';

export function ModeratorOnly(): MethodDecorator {
	return createFunctionPrecondition(async (message: Message) => {
		const result = await container.database.guildSettings.findUnique({
			where: { id: message.guild!.id }
		});
		if (
			!message.member!.roles.cache.some((role) => result!.modRoles.includes(role.id)) ||
			!OWNERS.includes(message.author.id) ||
			!message.member!.permissions.has('ADMINISTRATOR')
		) {
			throw new UserError({ message: 'This command can only run by Moderators!', identifier: 'permissionsMissing' });
		}
		return true;
	});
}
