import { ApplyOptions } from '@sapphire/decorators';
import { SpecteraCommand } from '#structures/SpecteraCommand';
import { Message, CommandInteraction, MessageEmbed } from 'discord.js';
import { type ApplicationCommandRegistry, RegisterBehavior } from '@sapphire/framework';
import { fetch, FetchResultTypes } from '@sapphire/fetch';
import { reply } from '@sapphire/plugin-editable-commands';

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
		const response = await fetch<any>('https://www.reddit.com/r/memes/random/.json', {}, FetchResultTypes.Result);
		const [list] = JSON.parse(response.body);
		const [post] = list.data.children;
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
		const response = await fetch<any>('https://www.reddit.com/r/memes/random/.json', {}, FetchResultTypes.Result);
		const [list] = JSON.parse(response.body);
		const [post] = list.data.children;
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
		await interaction.reply({ embeds: [embed] });
	}
}
