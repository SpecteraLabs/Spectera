import { OWNERS } from '#root/config';
import { createFunctionPrecondition } from '@sapphire/decorators';
import { UserError } from '@sapphire/framework';
import type { Message } from 'discord.js';

export function BotOwnerOnly(): MethodDecorator {
	return createFunctionPrecondition((message: Message) => {
		if (!OWNERS.includes(message.author.id)) {
			throw new UserError({ message: 'This command can only be used by bot owner!', identifier: 'permissionsMissing' });
		}
		return OWNERS.includes(message.author.id);
	});
}
