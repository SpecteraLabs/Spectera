import { CallbackFunction } from '../../interfaces/Event';

export const run: CallbackFunction = async (client, message) => {
	message.reply(
		`:ping_pong: Pong! Latency is **${Math.round(client.ws.ping)}**ms`
	);
};

export const name = 'ping';
export const category = 'misc';
export const aliases = ['latency', 'runtime'];
export const description = "Shows bot's Latency in milliseconds";
export const args = false;
