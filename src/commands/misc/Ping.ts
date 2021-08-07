import { CallbackFunction } from '../../interfaces/Event';

export const run: CallbackFunction = async (client, message) => {
	message.reply(
		`:ping_pong: Pong! Latency is **${Math.round(client.ws.ping)}**ms`
	);
};

export const name: string = 'ping';
export const category: string = 'misc';
export const aliases: string[] = ['latency', 'runtime'];
export const description: string = "Shows bot's Latency in milliseconds";
export const usage: string ='ping'