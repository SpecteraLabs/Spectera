import type { PreconditionResult } from '@sapphire/framework';
import { Precondition } from '@sapphire/framework';
import type { Message } from 'discord.js';

export class Administrator extends Precondition {
	public run(message: Message): PreconditionResult {
		return message.member.permissions.has('ADMINISTRATOR') ? this.ok() : this.error({ message: 'This command can only run by Administrators'});
	}
}

declare module '@sapphire/framework' {
    interface Preconditions {
        Administrator: never;
    }
}