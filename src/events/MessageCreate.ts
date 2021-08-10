import { Message, Collection, MessageEmbed } from 'discord.js';
import { CallbackFunction } from '../interfaces/Event';
import { Command } from '../interfaces/Command';

export const run: CallbackFunction = async (client, message: Message) => {
	const prefix = client.prefixes.get(message.guildId);

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
		const { cooldowns } = client;

		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Collection<string, number>());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 3) * 1000;

		if (typeof timestamps === 'number') return;
		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				const embed: MessageEmbed = new MessageEmbed({
					color: 0x8f82ff,
					title: 'Woah buddy, slow it down',
					description: `Buddy you have to wait ${timeLeft.toFixed(
						1
					)}s to use this command\nThe default cooldown is \`${
						command.cooldown
					}s\``,
					timestamp: Date.now(),
				});
				return message.reply({ embeds: [embed] });
			}
		}
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
		command
			.run(client, message, args)
			.catch((err: any) => client.logger.error(err));
		if (command.args && !args.length) {
			let reply = `You didn't provide any arguments, ${message.author}!`;

			if (command.usage) {
				reply += `\nIncorrect syntax, Use \`${prefix}${command.name} ${command.usage}\``;
			}

			return message.reply(reply);
		}
	}
};

export const name: string = 'messageCreate';
