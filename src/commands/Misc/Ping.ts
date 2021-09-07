import { ApplyOptions } from '@sapphire/decorators';
import type { Message } from 'discord.js';
import { SpecteraCommand } from '#structures/SpecteraCommand';
import { send } from '@sapphire/plugin-editable-commands';

@ApplyOptions<SpecteraCommand.Options>({
	description: 'Send back the latency of the bot',
})
export class Ping extends SpecteraCommand {
	public async run(message: Message) {
		const msg = await send(message, 'Ping?');
		return msg.edit(
			`Pong! Bot Latency ${Math.round(
				this.container.client.ws.ping
			)}ms. API Latency ${msg.createdTimestamp - message.createdTimestamp}ms.`
		);
	}
}
