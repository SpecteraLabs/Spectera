import type { PreconditionResult } from '@sapphire/framework';
import { Precondition } from '@sapphire/framework';
import type { Message } from 'discord.js';

export class NewsOnly extends Precondition {
	public run(message: Message): PreconditionResult {
		// @ts-expect-error Code is correct
		return message.channel.type === 'news'
			? this.ok()
			: this.error({
				message: 'This command can only be used in text channels.',
			});
	}
}

declare module '@sapphire/framework' {
	interface Preconditions {
		NewsOnly: never;
	}
}
