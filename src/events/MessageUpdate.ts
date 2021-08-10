import { Channel, Message, MessageEmbed } from 'discord.js';
import { CallbackFunction } from '../interfaces/Event';
import { messageLogSchema } from '../mongodb/schemas/Logging_schema';

export const run: CallbackFunction = async (
	client,
	oldMessage: Message,
	newMessage: Message
) => {
	if (newMessage.partial || oldMessage.partial) return;
	const wasMessage = oldMessage.content;
	const isMessage = newMessage.content;
	const guildId = newMessage.guild.id;
	const result = await messageLogSchema.findOne({ _id: guildId });
	if (!result) return;
	if (newMessage.fetchWebhook) return;
	const ochannel = newMessage.guild.channels.cache.find(
		(ch: Channel) => ch.id === result.channelId
	);
	if (newMessage.channel.type != 'GUILD_TEXT' || !ochannel.isText()) return;
	const embed = new MessageEmbed()
		.setAuthor(newMessage.author.tag, newMessage.author.displayAvatarURL())
		.setTitle(`Message edited in #${newMessage.channel.name}`)
		.setDescription(`**Before:** ${wasMessage}\n**After:** ${isMessage}`)
		.setColor(client.colors.error)
		.setFooter(`ID: ${newMessage.member.user.id}`)
		.setTimestamp();
	ochannel.send({ embeds: [embed] });
};
export const name = 'messageUpdate';
