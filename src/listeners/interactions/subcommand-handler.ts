import { ApplyOptions } from '@sapphire/decorators';
import { Listener, ListenerOptions } from '@sapphire/framework';
import type { Interaction } from 'discord.js';

@ApplyOptions<ListenerOptions>({
	event: 'interactionCreate',
	name: 'subcommandHandler'
})
export class UserEvent extends Listener {
	public async run(interaction: Interaction) {
		if (!interaction.isCommand()) return;
		const subcommand = interaction.options.getSubcommand();
		const { commandName } = interaction;
		const command = this.container.stores.get('commands').get(commandName);
		if (!command) return;
		const method = Reflect.get(command, `chatInput${subcommand.charAt(0).toUpperCase() + subcommand.slice(1)}`);
		await method(interaction);
	}
}
