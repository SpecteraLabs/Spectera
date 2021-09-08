import { Listener } from '@sapphire/framework';
import type { Guild } from 'discord.js';

export class GuildCreate extends Listener {
	public async run(guild: Guild) {
		await this.container.database.guildSettings.create({
			data: { id: guild.id }
		});
	}
}
