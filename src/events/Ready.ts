import { CallbackFunction } from '../interfaces/Event';

export const run: CallbackFunction = async (client) => {
	client.logger.success(`${client.user.tag} is ready!`);
};

export const name: string = 'ready';
