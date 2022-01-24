import type { Tag } from '#types/interfaces/Tag';
import { ApplyOptions } from '@sapphire/decorators';
import { InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework';
import type { AutocompleteInteraction } from 'discord.js';

@ApplyOptions<InteractionHandler.Options>({
	interactionHandlerType: InteractionHandlerTypes.Autocomplete
})
export class AutocompleteHandler extends InteractionHandler {
	public override async run(interaction: AutocompleteInteraction, result: InteractionHandler.ParseResult<this>) {
		return interaction.respond(result);
	}

	public override async parse(interaction: AutocompleteInteraction) {
		if (interaction.commandName !== 'tag') return this.none();
		if (interaction.options.getSubcommand() !== 'use') return this.none();
		const focused = interaction.options.getFocused(true);
		if (focused.name !== 'name') return this.none();
		const result = await this.container.database.guildSettings.findUnique({
			where: {
				id: interaction.guildId!
			}
		});
		if (!result || !result.tags) return this.none();
		let tags = result.tags.map((tag) => JSON.parse(tag)) as any[];
		tags = tags.map((tag) => tag.data) as Tag[];
		const data = tags.map((tag) => {
			return {
				name: tag.name.charAt(0).toUpperCase() + tag.name.slice(1),
				value: tag.name
			};
		});
		return this.some(data);
	}
}
