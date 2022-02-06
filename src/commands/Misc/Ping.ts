import { ApplyOptions } from '@sapphire/decorators';
import { SpecteraCommand } from '#structures/SpecteraCommand';
import { reply } from '@sapphire/plugin-editable-commands';
import { ChatInputCommand, RegisterBehavior } from '@sapphire/framework';
import { type CommandInteraction, Message } from 'discord.js';
import { editLocalized, resolveKey } from '@sapphire/plugin-i18next';

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
		const msg = await reply(message, {
			content: await resolveKey(message, 'commands/misc:ping')
		});
		return editLocalized(msg, {
			keys: 'commands/misc:editedPing',
			formatOptions: {
				latency: Math.floor(this.container.client.ws.ping),
				api_latency: msg.createdTimestamp - message.createdTimestamp
			}
		});
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
