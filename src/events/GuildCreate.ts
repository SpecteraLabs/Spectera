import { Guild } from 'discord.js'
import { CallbackFunction } from '../interfaces/Event'

export const run: CallbackFunction = async (client, guild: Guild) => {
	guild.me.setNickname('[+] Obligator');
		const types = ['WATCHING', 'LISTENING', 'COMPETING', 'STREAMING', 'PLAYING'];
		const activities = [`${client.guilds.cache.size} servers`, '+help for list of commands', 'Join https://discord.gg/WaqYbeFQUb for support'];
		setInterval(function() {
			const randAact = activities[Math.floor(Math.random() * activities.length)];
			client.user.setActivity(randAact, { type: 'WATCHING' });
		}, 2800);
}
export const name = 'guildCreate'