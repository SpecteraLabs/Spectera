import { Precondition, PreconditionResult } from '@sapphire/framework';
import type { Message } from 'discord.js';

export class Administrator extends Precondition {
	public run(message: Message): PreconditionResult {
		if (!message.guild) {
			return this.error({ message: 'This cannot be run in dms' });
		}
		return message.member!.permissions.has('ADMINISTRATOR') ? this.ok() : this.error({ message: 'This command can only run by Administrators!' });
	}
}
