import { MessageEmbed } from 'discord.js';
import { CallbackFunction } from '../../interfaces/Command';

export const run: CallbackFunction = async (client, message, args) => {
	const msg = client.snipes.get(message.channel.id);
	if (!msg) return message.reply("Didn't find any deleted messages.");
	const embed = new MessageEmbed()
		.setAuthor(msg.author, msg.member.user.displayAvatarURL())
		.setDescription(msg.content)
		.setColor('RANDOM')
		.setFooter('Get sniped lol')
		.setTimestamp();
	if (msg.image) embed.setImage(msg.image);
	message.channel.send({ embeds: [embed] });
};
export const name = 'snipe';
