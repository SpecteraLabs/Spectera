import { ApplyOptions } from '@sapphire/decorators';
import type { CommandInteraction } from 'discord.js';
import type { SlashCommandBuilder } from '@discordjs/builders';
import { type ApplicationCommandRegistry, RegisterBehavior, ChatInputCommand, container } from '@sapphire/framework';
import { SpecteraCommand } from '#structures/SpecteraCommand';

@ApplyOptions<SpecteraCommand.Options>({
	description: 'Your description here'
})
export class TagCommand extends SpecteraCommand {
	public registerApplicationCommands(registry: ApplicationCommandRegistry) {
		registry.registerChatInputCommand(
			(builder: SlashCommandBuilder) => {
				return builder
					.setName(this.name)
					.setDescription(this.description)
					.addSubcommand((subcommand) =>
						subcommand
							.setName('use')
							.setDescription('Use a tag')
							.addStringOption((option) =>
								option.setName('name').setDescription('Name of the tag to use').setRequired(true).setAutocomplete(true)
							)
					)
					.addSubcommand((subcommand) =>
						subcommand
							.setName('create')
							.setDescription('Create a tag')
							.addStringOption((option) => option.setName('name').setDescription('Name of the tag').setRequired(true))
							.addStringOption((option) => option.setName('description').setDescription('Description of the tag').setRequired(true))
							.addStringOption((option) => option.setName('response').setDescription('Response of the tag').setRequired(true))
							.addStringOption((option) => option.setName('options').setDescription('Options for the tag'))
					)
					.addSubcommand((subcommand) => subcommand.setName('clear').setDescription('Clear all tags of a server'));
			},
			{
				guildIds: ['859287138364030977'],
				behaviorWhenNotIdentical: RegisterBehavior.Overwrite
			}
		);
	}

	public async chatInputCreate(interaction: CommandInteraction) {
		const name = interaction.options.getString('name', true);
		const description = interaction.options.getString('description', true);
		const response = interaction.options.getString('response', true);
		const options = interaction.options.getString('options') as string | undefined;
		const data = container.parser.parseData({
			name,
			description,
			options,
			response
		});
		const pushableData = JSON.stringify(data);
		await container.database.guildSettings.update({
			where: {
				id: interaction.guildId!
			},
			data: {
				tags: {
					push: pushableData
				}
			}
		});
		return interaction.reply({
			content: 'Tag created'
		});
	}

	public async chatInputUse(...[interaction]: Parameters<ChatInputCommand['chatInputRun']>) {
		const result = await container.database.guildSettings.findUnique({
			where: {
				id: interaction.guildId!
			}
		});
		if (!result || !result.tags) return;
		const tagName = interaction.options.getString('name', true);
		console.log(tagName);
		const tags = result.tags.map((tag) => JSON.parse(tag));
		const tag = tags.find((tag) => tag.data.name === tagName);
		if (!tag)
			return interaction.reply({
				content: 'Tag not found'
			});
		const response = container.parser.parseResponse(tag.response, interaction);
		console.log(response, interaction.user);
		return interaction.reply({
			content: response
		});
	}

	public async chatInputClear(interaction: CommandInteraction) {
		await container.database.$executeRaw`UPDATE "GuildSettings" SET tags = array[]::varchar[] WHERE id = ${interaction.guild!.id}`;
		return interaction.reply({
			content: 'Tags cleared'
		});
	}
}
