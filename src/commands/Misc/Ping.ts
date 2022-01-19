import { ApplyOptions } from '@sapphire/decorators';
import { SpecteraCommand } from '#structures/SpecteraCommand';
import { reply } from '@sapphire/plugin-editable-commands';
import { ChatInputCommand, RegisterBehavior } from '@sapphire/framework';
import { type CommandInteraction, Message } from 'discord.js';

@ApplyOptions<SpecteraCommand.Options>({
	description: 'Sends back the latency of the bot',
	chatInputCommand: {
		register: true,
		guildIds: ['859287138364030977'],
		behaviorWhenNotIdentical: RegisterBehavior.Overwrite
	}
})
export class PingCommand extends SpecteraCommand {
	public async messageRun(...[message]: Parameters<SpecteraCommand['messageRun']>) {
		const msg = await reply(message, 'Ping?');
		return msg.edit(
			`Pong! Bot Latency ${Math.round(this.container.client.ws.ping)}ms. API Latency ${msg.createdTimestamp - message.createdTimestamp}ms.`
		);
	}

	public async chatInputRun(...[interaction]: Parameters<ChatInputCommand['chatInputRun']>) {
		const msg = await interaction.reply({ content: `Ping?`, fetchReply: true });
		if (msg instanceof Message) {
			const { diff, ping } = this.getPing(msg, interaction);

			return interaction.editReply(`Pong! Bot Latency ${ping}ms. API Latency ${diff}ms.`);
		}

		return interaction.editReply('Failed to retrieve ping :(');
	}

	private getPing(message: Message, interactionOrMessage: CommandInteraction) {
		const diff = (message.editedTimestamp || message.createdTimestamp) - interactionOrMessage.createdTimestamp;
		const ping = Math.round(this.container.client.ws.ping);

		return { diff, ping };
	}
}
