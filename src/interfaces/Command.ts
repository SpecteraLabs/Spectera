import { Obligator } from '../client/Client';
import { Message } from 'discord.js';

export interface CallbackFunction {
	(client: Obligator, message: Message, args: string[]): Promise<unknown>;
}

export interface Command {
	name: string;
	category: string;
	aliases?: string[];
	cooldown?: number;
	run: CallbackFunction;
	args: boolean;
	usage?: string;
}
