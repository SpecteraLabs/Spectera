import { Obligator } from '../client/Client';

export interface CallbackFunction {
	(client: Obligator, ...args: any[]): Promise<unknown>;
}

export interface Event {
	name: string;
	run: CallbackFunction;
}
