import { OWNERS } from '#root/config';
import { Precondition, PreconditionResult } from '@sapphire/framework';
import type { Message } from 'discord.js';

export class BotOwner extends Precondition {
	public run(message: Message): PreconditionResult {
		return OWNERS.includes(message.author.id) ? this.ok() : this.error({ message: 'This command can only be used by bot owner!' });
	}
}
