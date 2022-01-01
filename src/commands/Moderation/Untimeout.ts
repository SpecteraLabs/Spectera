import { ApplyOptions } from '@sapphire/decorators';
import { SpecteraCommand } from '#structures/SpecteraCommand';
import type { Message, CommandInteraction } from 'discord.js';
import { type Args, type ApplicationCommandRegistry, RegisterBehavior, UserError } from '@sapphire/framework';
import { reply } from '@sapphire/plugin-editable-commands';

@ApplyOptions<SpecteraCommand.Options>({
	aliases: ['unmute'],
	description: 'Remove timeout of a member'
})
export class UntimeoutCommand extends SpecteraCommand {
	public registerApplicationCommands(registry: ApplicationCommandRegistry) {
		registry.registerChatInputCommand(
			{
				name: this.name,
				description: this.description,
				options: [
					{
						name: 'target',
						description: 'The member to timeout',
						type: 'USER',
						required: true
					}
				]
			},
			{
				guildIds: ['859287138364030977'],
				behaviorWhenNotIdentical: RegisterBehavior.Overwrite
			}
		);
	}

	public async messageRun(message: Message, args: Args) {
		const member = await args.pick('member').catch(() => {
			throw new UserError({ message: 'Please provide a member to untimeout', identifier: 'invalid-args' });
		});
		if (!member.communicationDisabledUntil) return reply(message, 'The member is not timedout');
		await member.timeout(null);
		return reply(message, `${member.user.tag} has been untimeout`);
	}

	public async chatInputRun(interaction: CommandInteraction) {
		const target = interaction.options.getUser('target', true);
		const member = await interaction.guild!.members.fetch(target.id);
		if (!member.communicationDisabledUntil)
			return interaction.reply({
				content: 'The member is not timedout',
				ephemeral: true
			});
		await member.timeout(null);
		return interaction.reply({ content: `${member.user.tag} has been untimeout`, ephemeral: true });
	}
}
