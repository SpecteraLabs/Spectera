import { Command, Listener } from '@sapphire/framework';
import type { Interaction } from 'discord.js';

export class UserEvent extends Listener {
	public run(interaction: Interaction) {
		if (!interaction.isCommand()) return;
		const command = this.container.stores.get('commands').get(interaction.commandName) as Command;
		if (!command.chatInputRun) return;
		try {
			command.chatInputRun(interaction);
		} catch (error) {
			console.error(error);
		}
	}
}
