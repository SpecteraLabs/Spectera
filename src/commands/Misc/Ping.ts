import { ApplyOptions } from '@sapphire/decorators';
import type { Message } from 'discord.js';
import { ObligatorCommand } from '#structures/ObligatorCommand';

@ApplyOptions<ObligatorCommand.Options>({
	description: 'Send back the latency of the bot',
})
export class Ping extends ObligatorCommand {
	public async run(message: Message) {
		const msg = await message.channel.send('Ping?');
		return msg.edit(
			`Pong! Bot Latency ${Math.round(
				this.container.client.ws.ping
			)}ms. API Latency ${msg.createdTimestamp - message.createdTimestamp}ms.`
		);
	}
}
