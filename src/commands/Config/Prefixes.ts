import { ModeratorOnly } from '#lib/decorators/index';
import { SpecteraSubCommand } from '#structures/SpecteraSubCommand';
import { ApplyOptions } from '@sapphire/decorators';
import type { Args } from '@sapphire/framework';
import { reply } from '@sapphire/plugin-editable-commands';
import { Message, MessageEmbed } from 'discord.js';

@ApplyOptions<SpecteraSubCommand.Options>({
	subCommands: ['add', 'remove', 'show', { input: 'view', output: 'show' }],
	description: 'prefix configuration for your server',
	runIn: ['GUILD_ANY']
})
export class Prefix extends SpecteraSubCommand {
	@ModeratorOnly()
	public async add(message: Message, args: Args) {
		const result = await this.container.database.guildSettings.findUnique({
			where: { id: message.guild!.id }
		});
		const prefix = await args.pick('string');
		if (result!.modRoles.includes(prefix)) return reply(message, 'This prefix already exists!');
		await this.container.database.guildSettings.update({
			where: { id: message.guild!.id },
			data: {
				prefixes: {
					push: prefix
				}
			}
		});
		return reply(message, `Added ${prefix} as a prefix for this server!`);
	}
	@ModeratorOnly()
	public async remove(message: Message, args: Args) {
		const prefix = await args.pick('string');
		const guild = await this.container.database.guildSettings.findUnique({
			where: { id: message.guild!.id }
		});
		if (!guild?.prefixes.includes(prefix)) return reply(message, `The prefix ${prefix} does not exist`);
		if (!guild.prefixes.length) return reply(message, 'This server does not have any custom prefix');
		if (guild.prefixes.length === 1) {
			await this.container.database.$executeRaw`UPDATE "GuildSettings" SET prefixes = array[]::varchar[] WHERE id = ${message.guild!.id}`;
			return reply(message, 'Successfully removed that prefix');
		}
		const index = guild.prefixes.indexOf(prefix);
		guild.prefixes.splice(index, 1);
		await this.container.database.$executeRaw`UPDATE "GuildSettings" SET prefixes = ${guild.prefixes} WHERE id = ${message.guild!.id}`;
		return reply(message, `Succefully removed that prefix!`);
	}
	public async show(message: Message) {
		const result = await this.container.database.guildSettings.findUnique({ where: { id: message.guild!.id } });
		const prefixes = result!.prefixes.toString();
		const embed = new MessageEmbed()
			.setAuthor(`${message.guild!.name}'s prefixes (${result?.prefixes.length})`, message.guild!.iconURL() as string)
			.setDescription('`'.concat(prefixes.replaceAll(',', '` `')).concat('`'))
			.setColor('WHITE')
			.setFooter(`Requested by ${message.member?.displayName}`, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
		reply(message, { embeds: [embed] });
	}
}
