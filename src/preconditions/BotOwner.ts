import type { PreconditionResult } from '@sapphire/framework';
import { Precondition } from '@sapphire/framework';
import type { Message } from 'discord.js';

export class BotOwner extends Precondition {
	public run(message: Message): PreconditionResult {
		return message.author.id === '564468550727761920'
			? this.ok()
			: this.error({ message: 'This command can only be used by bot owner. ' });
	}
}

declare module '@sapphire/framework' {
	interface Preconditions {
		BotOwner: never;
	}
}
