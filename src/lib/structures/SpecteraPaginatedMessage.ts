import { PaginatedMessage, PaginatedMessageOptions } from '@sapphire/discord.js-utilities';

export class SpecteraPaginatedMessage extends PaginatedMessage {
	public constructor(options: PaginatedMessageOptions = {}, idle = 60000 * 5) {
		super(options);
		this.setIdle(idle);
	}
}
