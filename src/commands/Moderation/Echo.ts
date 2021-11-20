import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators';
import type { CommandInteraction, Message, Permissions, TextChannel } from 'discord.js';
import { SpecteraCommand } from '#structures/SpecteraCommand';
import { ApplicationCommandRegistry, RegisterBehavior } from '@sapphire/framework';

@ApplyOptions<SpecteraCommand.Options>({
	aliases: ['speak', 'say', 'parrot'],
	description: 'Replies with whatever you say',
	bucket: 1,
	cooldown: 10000,
	runIn: ['GUILD_TEXT']
})
export class Echo extends SpecteraCommand {
	public registerApplicationCommands(registry: ApplicationCommandRegistry) {
		registry.registerChatInputCommand(
			{
				name: this.name,
				description: this.description,
				options: [
					{
						name: 'channel',
						description: 'The channel to echo in',
						type: 'CHANNEL'
					},
					{
						name: 'message',
						description: 'The message to echo',
						type: 'STRING'
					}
				]
			},
			{
				guildIds: ['859287138364030977'],
				behaviorWhenNotIdentical: RegisterBehavior.Overwrite
			}
		);
	}

	@RequiresUserPermissions('MANAGE_MESSAGES')
	public async messageRun(message: Message, args: SpecteraCommand.Args) {
		const destination = await args.pick('guildTextChannel').catch(() => message.channel);
		const msg = await args.rest('string');
		return destination.send({ content: msg });
	}

	public async chatInputRun(interaction: CommandInteraction) {
		const { permissions } = interaction.member;
		if (!(permissions as Readonly<Permissions>).has('MANAGE_MESSAGES')) return;
		const destination = interaction.options.getChannel('channel', true);
		const msg = interaction.options.getString('message', true);
		await (destination as TextChannel).send({ content: msg });
		await interaction.reply({ ephemeral: true, content: 'Done!' });
	}
}
