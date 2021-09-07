/* eslint-disable no-useless-return */
import { Listener } from '@sapphire/framework';
import type { Message } from 'discord.js';

export class MessageCreate extends Listener {
	public run(message: Message) {
		if (message.webhookId !== null) return;
		if (message.system) return;
		if (message.author.bot) return;
	}
}
