import { loadPrefixes } from '../database/LoadPrefixes';
import { CallbackFunction } from '../interfaces/Event';


export const run: CallbackFunction = async (client) => {
	loadPrefixes(client);
	const activities = [
		`${client.guilds.cache.size} servers`,
		'+help for list of commands',
		'Join https://discord.gg/WaqYbeFQUb for support',
	];
	setInterval(function () {
		const randAact = activities[Math.floor(Math.random() * activities.length)];
		client.user.setActivity(randAact, { type: 'WATCHING' });
	}, 2800);
	client.logger.success(
		`${client.user.tag} is ready on ${client.guilds.cache.size} servers and ${client.users.cache.size} members using it`
	);
};

export const name: string = 'ready';
