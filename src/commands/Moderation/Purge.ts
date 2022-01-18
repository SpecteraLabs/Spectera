import { ApplyOptions } from '@sapphire/decorators';
import { SpecteraCommand } from '#structures/SpecteraCommand';
import type { Message, CommandInteraction, TextChannel } from 'discord.js';
import type { SlashCommandBuilder } from '@discordjs/builders';
import { type Args, type ApplicationCommandRegistry, RegisterBehavior } from '@sapphire/framework';
import { reply } from '@sapphire/plugin-editable-commands';

@ApplyOptions<SpecteraCommand.Options>({
	description: 'Purge messages in a channel',
	runIn: ['GUILD_TEXT']
})
export class PurgeCommand extends SpecteraCommand {
	public registerApplicationCommands(registry: ApplicationCommandRegistry) {
		registry.registerChatInputCommand(
			(builder: SlashCommandBuilder) => {
				return builder
					.setName(this.name)
					.setDescription(this.description)
					.addNumberOption((number) => {
						return number
							.setName('amount')
							.setRequired(true)
							.setDescription('The amount of messages to purge')
							.setMinValue(1)
							.setMaxValue(99);
					});
			},
			{
				guildIds: ['859287138364030977'],
				behaviorWhenNotIdentical: RegisterBehavior.Overwrite
			}
		);
	}

	public async messageRun(message: Message, args: Args) {
		const amount = await args.pick('number').catch(() => 1);
		await (message.channel as TextChannel).bulkDelete(amount);
		return reply(message, {
			content: `Successfully purged ${amount} messages`
		});
	}

	public async chatInputRun(interaction: CommandInteraction) {
		const amount = interaction.options.getNumber('amount', true);
		await (interaction.channel as TextChannel).bulkDelete(amount);
		return interaction.reply({
			content: `Successfully purged ${amount} messages`
		});
	}
}
