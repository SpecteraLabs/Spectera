import type { PreconditionResult } from '@sapphire/framework';
import { Precondition } from '@sapphire/framework';
import type { Message } from 'discord.js';

export class Moderator extends Precondition {
	public run(message: Message): PreconditionResult {
		return message.member.permissions.has('KICK_MEMBERS' || 'BAN_MEMBERS' || 'MANAGE_GUILD' || 'MANAGE_CHANNELS') ? this.ok() : this.error({ message: 'This command can only run by Administrators'});
	}
}

declare module '@sapphire/framework' {
    interface Preconditions {
        Moderator: never;
    }
}