import { SpecteraCommand } from '#structures/SpecteraCommand';
import { ApplyOptions } from '@sapphire/decorators';
import { reply } from '@skyra/editable-commands';
import { Message, MessageEmbed } from 'discord.js';
// @ts-ignore
import { version, dependencies } from '../../../package.json';

@ApplyOptions<SpecteraCommand.Options>({
	description: 'Stats of Obligator'
})
export class Stats extends SpecteraCommand {
	public async run(message: Message) {
		const statsEmbed = new MessageEmbed().setColor('WHITE').setDescription(
			`**Servers**: ${this.container.client.guilds.cache.size}
				**Channels**: ${this.container.client.channels.cache.size}
				**Members**: ${this.container.client.users.cache.size}
				**Bot Version**: ${version}
				**DiscordJS Version**: ${dependencies['discord.js'].replaceAll('^', '')}`
		);
		reply(message, { embeds: [statsEmbed] });
	}
}
