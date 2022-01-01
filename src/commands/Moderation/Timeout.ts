import { ApplyOptions } from '@sapphire/decorators';
import { SpecteraCommand } from '#structures/SpecteraCommand';
import type { CommandInteraction, Message } from 'discord.js';
import { type ApplicationCommandRegistry, type Args, RegisterBehavior, UserError } from '@sapphire/framework';
import { Duration } from '@sapphire/time-utilities';
import { reply } from '@sapphire/plugin-editable-commands';
import { time, TimestampStyles } from '@discordjs/builders';

@ApplyOptions<SpecteraCommand.Options>({
	aliases: ['mute'],
	description: 'Timeout a person'
})
export class MuteCommand extends SpecteraCommand {
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
					},
					{
						name: 'reason',
						description: 'The reason for timeout',
						type: 'STRING',
						required: true
					},
					{
						name: 'duration',
						description: 'Duration of the mute',
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

	public async messageRun(message: Message, args: Args) {
		const member = await args.pick('member').catch(() => {
			throw new UserError({ message: 'Please provide a member to timeout', identifier: 'invalid-args' });
		});
		const timeForTimeout = await args.pick('string').catch(() => '1h');
		const duration = new Duration(timeForTimeout).offset;
		const reason = await args.rest('string');
		await member.timeout(duration, reason);
		return reply(
			message,
			`${member.user.tag} has been timedout and their timeout will end ${time(
				new Duration(timeForTimeout).fromNow,
				TimestampStyles.RelativeTime
			)} for the following reason: ${reason}`
		);
	}

	public async chatInputRun(interaction: CommandInteraction) {
		const user = interaction.options.getUser('target', true);
		const timeForTimeout = interaction.options.getString('duration', true);
		const reason = interaction.options.getString('reason', true);
		const duration = timeForTimeout ? new Duration(timeForTimeout).offset : new Duration('1h').offset;
		const member = await interaction.guild!.members.fetch(user.id);
		await member.timeout(duration, reason);
		return interaction.reply({
			ephemeral: true,
			content: `${user.tag} has been timedout and their timeout will end ${time(
				new Duration(timeForTimeout).fromNow,
				TimestampStyles.RelativeTime
			)} for the following reason: ${reason}`
		});
	}
}
