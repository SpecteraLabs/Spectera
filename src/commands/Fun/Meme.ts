import { ApplyOptions } from '@sapphire/decorators';
import { SpecteraCommand } from '#structures/SpecteraCommand';
import { Message, CommandInteraction, MessageEmbed } from 'discord.js';
import { type ApplicationCommandRegistry, RegisterBehavior } from '@sapphire/framework';
import { fetch } from '@sapphire/fetch';
import { reply } from '@sapphire/plugin-editable-commands';
import type { Reddit } from '#types/interfaces/Reddit';

@ApplyOptions<SpecteraCommand.Options>({
	description: 'Sends a random meme from r/memes'
})
export class MemeCommand extends SpecteraCommand {
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
		const result = await fetch<any>('https://www.reddit.com/r/memes/random/.json');
		const list = result[0];
		const post = list.data.children[0];
		const { data } = post;
		const { url, title, ups, num_comments, permalink } = data;
		const embed = new MessageEmbed({
			title,
			url: `https://reddit.com${permalink}`,
			color: 'RANDOM',
			image: url,
			footer: {
				text: `👍 ${ups} | 💬 ${num_comments}`
			}
		});
		return reply(message, {
			embeds: [embed]
		});
	}

	public async chatInputRun(interaction: CommandInteraction) {
		const result = await fetch<Reddit>('https://www.reddit.com/r/memes/random/.json');
		const list = result[0];
		const post = list.data.children[0];
		const { data } = post;
		const { url, title, ups, num_comments, permalink } = data;
		console.log(url);
		const embed = new MessageEmbed({
			title,
			url: `https://reddit.com${permalink}`,
			color: 'RANDOM',
			footer: {
				text: `👍 ${ups} | 💬 ${num_comments}`
			}
		}).setImage(url);
		await interaction.reply({ embeds: [embed] });
	}
}
