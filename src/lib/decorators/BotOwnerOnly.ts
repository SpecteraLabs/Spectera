import { OWNERS } from '#root/config';
import { createFunctionPrecondition } from '@sapphire/decorators';
import type { Message } from 'discord.js';

export function BotOwnerOnly(): MethodDecorator {
	return createFunctionPrecondition((message: Message) => {
		if (!OWNERS.includes(message.author.id)) {
			message.reply('This command can only be used by bot owner!');
		}
		return OWNERS.includes(message.author.id);
	});
}
