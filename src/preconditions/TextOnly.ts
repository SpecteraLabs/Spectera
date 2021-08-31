import { PreconditionResult, Precondition } from '@sapphire/framework';
import type { Message } from 'discord.js';

export class TextOnly extends Precondition {
	public run(message: Message): PreconditionResult {
		// @ts-expect-error Code is correct
		return message.channel.type === 'text'
			? this.ok()
			: this.error({
					message: 'This command can only be used in text channels.',
			  });
	}
}
