import { Listener, ListenerOptions } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';
import { mongo } from '../database/mongo';

@ApplyOptions<ListenerOptions>({
	name: 'ready',
	once: true,
})
export class Ready extends Listener {
	async run() {
		this.container.logger.info(`${this.container.client.user!.tag} is ready!`);
		await mongo().then(() => {
			this.container.logger.info('Connected to database');
		});
	}
}
