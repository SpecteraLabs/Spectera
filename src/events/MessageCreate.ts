import { Message } from 'discord.js';
import { CallbackFunction } from '../interfaces/Event';
import ConfigJSON from '../config.json';
import { Command } from '../interfaces/Command';
import { Obligator } from '../client/Client';
import { mongo } from '../database/mongo';
import { commandPrefixSchema } from '../database/schemas/Prefix_schema';
const { prefix: globalPrefix } = ConfigJSON;
export const guildPrefixes = {};

export const run: CallbackFunction = async (client, message: Message) => {
	const prefix = guildPrefixes[message.guild.id] || globalPrefix;

	if (message.author.bot || !message.guild) return;
	if (message.content.toLowerCase().startsWith(prefix)) {
		const args: string[] = message.content
			.slice(prefix.length)
			.trim()
			.split(/ +/g);
		const cmd: string = args.shift().toLowerCase();
		const command: Command =
			client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
		if (!command) return;
		command
			.run(client, message, args)
			.catch((err: any) => client.logger.error(err));
	}
};

export const name: string = 'messageCreate';
export const loadPrefixes = async (client: Obligator) => {
	await mongo().then(async () => {
		for (const guild of client.guilds.cache) {
			const guildId = guild[1].id;

			const result = await commandPrefixSchema.findOne({ _id: guildId });
			guildPrefixes[guildId] = result ? result.prefix : globalPrefix;
			client.logger.info(result);
		}
	});
};
