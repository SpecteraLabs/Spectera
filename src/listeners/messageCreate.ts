import { Listener, Events } from '@sapphire/framework';
import type { Message } from 'discord.js';

export class MessageCreate extends Listener<typeof Events.MessageCreate> {
	public async run(message: Message) {
		if (!message.guild && message.content.startsWith('+')) {
			await message.reply({ content: 'You cannot use commands here!' });
		}

		this.container.client.emit(Events.MessageCreate, message);
	}
}
