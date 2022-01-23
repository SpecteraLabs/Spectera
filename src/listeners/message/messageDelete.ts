import { BrandingColors } from '#lib/constants';
import { isGuildBasedChannel } from '@sapphire/discord.js-utilities';
import { Listener } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';

export class MessageDelete extends Listener {
	public async run(message: Message) {
		if (message.partial) await message.fetch();
		this.container.client.snipes.set(message.channel.id, {
			content: message.content,
			author: message.author.tag,
			member: message.member!,
			image: message.attachments.first() ? message.attachments.first()?.proxyURL : null
		});

		const result = await this.container.database.guildLogs.findUnique({
			where: { id: message.guild!.id }
		});
		const { messageLogChannel } = result!;
		if (!messageLogChannel) return;

		const channel = message.guild!.channels.cache.find((ch) => ch.id === messageLogChannel);
		if (!isGuildBasedChannel(channel) || !isGuildBasedChannel(message.channel)) return;
		const embed = new MessageEmbed()
			.setAuthor(message.author.tag, message.member!.user.displayAvatarURL())
			.setTitle(`Message deleted in #${message.channel.name}`)
			.setDescription(message.content)
			.setColor(BrandingColors.Secondary)
			.setFooter({ text: `ID: ${message.member!.user.id}` })
			.setTimestamp();
		if (message.attachments.first()) embed.setImage(message.attachments.first()!.proxyURL);
		await channel!.send({ embeds: [embed] });
	}
}
