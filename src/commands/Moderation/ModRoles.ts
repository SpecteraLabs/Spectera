import { ApplyOptions } from '@sapphire/decorators';
import type { Args } from '@sapphire/framework';
import { SubCommandPluginCommand } from '@sapphire/plugin-subcommands';
import type { Message } from 'discord.js';

@ApplyOptions<SubCommandPluginCommand.Options>({
	subCommands: ['set', 'show'],
})
export class ModRoles extends SubCommandPluginCommand {
	public async set(message: Message, args: Args) {
		const role = await args.pick('role');
		await message.reply(role.id);
	}
}
