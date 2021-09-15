import { OWNERS } from '#root/config';
import { createFunctionPrecondition } from '@sapphire/decorators';
import type { Message } from 'discord.js';

export function AdministatorOnly(): MethodDecorator {
	return createFunctionPrecondition((message: Message) => {
		if (!message.member!.permissions.has('ADMINISTRATOR') || !OWNERS.includes(message.author.id)) {
			message.reply('This command can only be used by bot owners!');
		}
		return message.member!.permissions.has('ADMINISTRATOR') || OWNERS.includes(message.author.id);
	});
}
