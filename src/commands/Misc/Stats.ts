import { SpecteraCommand } from '#structures/SpecteraCommand';
import { ApplyOptions } from '@sapphire/decorators';
import { ApplicationCommandRegistry, RegisterBehavior } from '@sapphire/framework';
import { reply } from '@skyra/editable-commands';
import { CommandInteraction, Message, MessageEmbed } from 'discord.js';
// @ts-ignore i want to import this but it's not in the baseDir
import { version, dependencies } from '../../../package.json';

@ApplyOptions<SpecteraCommand.Options>({
	description: 'Stats of Spectera'
})
export class StatsCommand extends SpecteraCommand {
	public registerApplicationCommands(registry: ApplicationCommandRegistry) {
		registry.registerChatInputCommand(
			{
				name: this.name,
				description: this.description
			},
			{
				guildIds: ['859287138364030977'],
				behaviorWhenNotIdentical: RegisterBehavior.Overwrite
			}
		);
	}

	public async messageRun(message: Message) {
		const statsEmbed = new MessageEmbed().setColor('WHITE').setDescription(
			`**Servers**: ${this.container.client.guilds.cache.size}
			**Channels**: ${this.container.client.channels.cache.size}
			**Members**: ${this.container.client.users.cache.size}
			**Bot Version**: ${version}
			**DiscordJS Version**: ${dependencies['discord.js'].replaceAll('^', '')}`
		);
		await reply(message, { embeds: [statsEmbed] });
	}

	public async chatInputRun(interaction: CommandInteraction) {
		const statsEmbed = new MessageEmbed().setColor('WHITE').setDescription(
			`**Servers**: ${this.container.client.guilds.cache.size}
			**Channels**: ${this.container.client.channels.cache.size}
			**Members**: ${this.container.client.users.cache.size}
			**Bot Version**: ${version}
			**DiscordJS Version**: ${dependencies['discord.js'].replaceAll('^', '')}`
		);
		await interaction.reply({ embeds: [statsEmbed] });
	}
}
