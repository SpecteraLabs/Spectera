import { Precondition, AsyncPreconditionResult } from '@sapphire/framework';
import type { Message } from 'discord.js';

export class Moderator extends Precondition {
	public async run(message: Message): AsyncPreconditionResult {
		if (!message.guild) {
			return this.error({ message: 'This cannot be run in dms' });
		}
		const guild = await this.container.database.guildSettings.findUnique({
			where: { id: message.guild!.id }
		});
		return message.member!.permissions.has('BAN_MEMBERS') || message.member!.roles.cache.some((r) => guild!.modRoles.includes(r.id))
			? this.ok()
			: this.error({ message: 'This command can only run by Moderators!' });
	}
}
