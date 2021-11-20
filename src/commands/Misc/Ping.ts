import { ApplyOptions } from '@sapphire/decorators';
import type { CommandInteraction, Message } from 'discord.js';
import { SpecteraCommand } from '#structures/SpecteraCommand';
import { send } from '@sapphire/plugin-editable-commands';
import { ApplicationCommandRegistry, RegisterBehavior } from '@sapphire/framework';

@ApplyOptions<SpecteraCommand.Options>({
	description: 'Sends back the latency of the bot'
})
export class Ping extends SpecteraCommand {
	public registerApplicationCommands(registry: ApplicationCommandRegistry) {
		registry.registerChatInputCommand(
			{
				name: this.name,
				description: this.description
			},
			{
				guildIds: ['859287138364030977'],
				idHints: ['911242222127706212'],
				behaviorWhenNotIdentical: RegisterBehavior.Overwrite
			}
		);
	}

	public async messageRun(message: Message) {
		const msg = await send(message, 'Ping?');
		return msg.edit(
			`Pong! Bot Latency ${Math.round(this.container.client.ws.ping)}ms. API Latency ${msg.createdTimestamp - message.createdTimestamp}ms.`
		);
	}

	public async chatInputRun(interaction: CommandInteraction) {
		await interaction.reply({ content: `Pong! Bot Latency ${Math.round(this.container.client.ws.ping)}ms.` });
	}
}
