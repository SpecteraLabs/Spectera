import { Events, Listener } from '@sapphire/framework';
import type { Message } from 'discord.js';

export class MessageCreate extends Listener {
	public run(message: Message) {
		if (message.webhookId !== null) return;
		if (message.system) return;
		if (message.author.bot) return;
		if (message.channel.type === 'DM') return;
		this.container.client.emit(Events.MessageCreate, message);
	}
}
