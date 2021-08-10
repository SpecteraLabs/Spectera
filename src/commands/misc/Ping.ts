import { Message } from 'discord.js';
import { CallbackFunction } from '../../interfaces/Event';

export const run: CallbackFunction = async (client, message: Message) => {
	const msg = await message.reply('Pinging....');
	msg.edit(
		`:ping_pong: Pong!\n**Latency**: ${Math.round(
			client.ws.ping
		)}ms\n**Api Latency**: ${msg.createdTimestamp - message.createdTimestamp}ms`
	);
};

export const name = 'ping';
export const category = 'misc';
export const aliases = ['latency', 'runtime'];
export const description = "Shows bot's Latency in milliseconds";
export const args = false;
