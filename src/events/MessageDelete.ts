import { Channel, MessageEmbed } from 'discord.js';
import { CallbackFunction } from '../interfaces/Event';
import { messageLogSchema } from '../mongodb/schemas/Logging_schema';

export const run: CallbackFunction = async (client, message) => {
	if (message.partial) return;
	client.snipes.set(message.channel.id, {
		content: message.content,
		author: message.author.tag,
		member: message.member,
		image: message.attachments.first()
			? message.attachments.first().proxyURL
			: null,
	});
	const guildId = message.guild.id;
	const result = await messageLogSchema.findOne({ _id: guildId });
	if (!result) return;
	const ochannel = message.guild.channels.cache.find(
		(ch: Channel) => ch.id === result.channelId
	);
	const embed = new MessageEmbed()
		.setAuthor(message.author.tag, message.member.user.displayAvatarURL())
		.setTitle(`Message deleted in #${message.channel.name}`)
		.setDescription(message.content)
		.setColor(client.colors.error)
		.setFooter(`ID: ${message.member.user.id}`)
		.setTimestamp();
	if (message.image) embed.setImage(message.image);
	ochannel.send({ embeds: [embed] });
};
export const name = 'messageDelete';
