import { Message } from 'discord.js';
import { CallbackFunction } from '../interfaces/Event';
import { Command } from '../interfaces/Command';
import { guildPrefixes } from '../database/LoadPrefixes';

export const run: CallbackFunction = async (client, message: Message) => {
	const prefix = guildPrefixes[message.guild.id];

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