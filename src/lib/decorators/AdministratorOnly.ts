import { OWNERS } from '#root/config';
import { createFunctionPrecondition } from '@sapphire/decorators';
import { UserError } from '@sapphire/framework';
import type { Message } from 'discord.js';

export function AdministatorOnly(): MethodDecorator {
	return createFunctionPrecondition((message: Message) => {
		if (!message.member!.permissions.has('ADMINISTRATOR') || !OWNERS.includes(message.author.id)) {
			throw new UserError({ message: 'You must be an administrator to use this command', identifier: 'permissionsMissing' });
		}
		return true;
	});
}
