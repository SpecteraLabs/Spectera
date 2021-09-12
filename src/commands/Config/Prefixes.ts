import { SpecteraSubCommand } from '#structures/SpecteraSubCommand';
import { PermissionLevels } from '#types/enums/PermissionLevels';
import { ApplyOptions } from '@sapphire/decorators';
import type { Args } from '@sapphire/framework';
import { reply } from '@sapphire/plugin-editable-commands';
import { Message, MessageEmbed } from 'discord.js';

@ApplyOptions<SpecteraSubCommand.Options>({
	subCommands: ['add', 'remove', 'show'],
	description: 'prefix configuration for your server',
	runIn: ['GUILD_ANY'],
	permissionLevel: PermissionLevels.Moderator
})
export class Prefix extends SpecteraSubCommand {
	public async add(message: Message, args: Args) {
		const prefix = await args.pick('string');
		await this.container.database.guildSettings.update({
			where: { id: message.guild!.id },
			data: {
				prefixes: {
					push: prefix
				}
			}
		});
		reply(message, `Added ${prefix} as a prefix for this server!`);
	}
	public async remove(message: Message, args: Args) {
		const prefix = await args.pick('string');
		// empty for now
		console.log(message.content, prefix);
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
