import { ApplyOptions } from '@sapphire/decorators';
import { Command, CommandOptions } from '@sapphire/framework';
import type { Message } from 'discord.js';

@ApplyOptions<CommandOptions>({
	name: 'ping',
	description: 'Send back the latency of the bot',
})
export class Ping extends Command {
	async run(message: Message) {
		const msg = await message.channel.send('Ping?');
		return msg.edit(
			`Pong! Bot Latency ${Math.round(
				this.container.client.ws.ping
			)}ms. API Latency ${msg.createdTimestamp - message.createdTimestamp}ms.`
		);
	}
}
