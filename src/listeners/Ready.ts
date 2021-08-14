import { Listener, PieceContext } from '@sapphire/framework';

export class Ready extends Listener {
	constructor(context: PieceContext) {
		super(context, {
			name: 'ready',
			once: true,
		});
	}
	async run() {
		this.container.logger.info(`${this.container.client.user.tag} is ready!`);
	}
}
