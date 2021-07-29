import { Obligator } from '../client/Client';
import { Message } from 'discord.js';

export interface CallbackFunction {
	(client: Obligator, ...args: any[]): Promise<unknown>;
}

export interface Event {
	name: string;
	run: CallbackFunction;
}
