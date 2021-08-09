import { Collection, Message, MessageEmbed, Snowflake } from 'discord.js';
import { CallbackFunction } from '../interfaces/Event';
import { messageLogSchema } from '../mongodb/schemas/Logging_schema';

export const run: CallbackFunction = async (client, messages: Collection<Snowflake, Message>) => {
	const ms = messages.first();
	const guildId = ms.guild.id;
	const result = await messageLogSchema.findOne({ _id: guildId });
	if (!result) return;
	let value = '';
	let count = 0;
	const embed = new MessageEmbed().setColor(client.colors.error).setTimestamp();
	for (const message of messages.values()) {
		if (message.partial) await message.fetch();
		if (message.channel.partial) await message.channel.fetch();
		if (ms.channel.type != 'GUILD_TEXT' || message.channel.type != "GUILD_TEXT") return;
		count++;
		embed.setTitle(`${count} messages purged in #${ms.channel.name}`);
		value += `[${message.author.tag}]: ${message.content}\n`;
		embed.setDescription(`${value}`);
	}
	const channel: any = ms.guild.channels.cache.find(
		(ch) => ch.id === result.channelId
	);
	channel.send({ embeds: [embed] });
};
export const name = 'messageDeleteBulk';
