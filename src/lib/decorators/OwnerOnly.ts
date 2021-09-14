import { OWNERS } from '#root/config';
import { createFunctionPrecondition, FunctionFallback } from '@sapphire/decorators';
import type { Message } from 'discord.js';

export function OwnerOnly(fallback: FunctionFallback = (): void => undefined): MethodDecorator {
	return createFunctionPrecondition((message: Message) => OWNERS.includes(message.author.id), fallback);
}
