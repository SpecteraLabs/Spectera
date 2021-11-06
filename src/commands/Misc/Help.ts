import { ApplyOptions } from '@sapphire/decorators';
import { SpecteraCommand } from '#structures/SpecteraCommand';
import { Collection, Message, MessageEmbed } from 'discord.js';
import { SpecteraPaginatedMessage } from '#structures/SpecteraPaginatedMessage';
import { reply } from '@sapphire/plugin-editable-commands';
import { Args, container } from '@sapphire/framework';
import { UserOrMemberMentionRegex } from '@sapphire/discord.js-utilities';
import { BrandingColors } from '#lib/constants';

@ApplyOptions<SpecteraCommand.Options>({
	description: 'Your description here.'
})
export class HelpCommand extends SpecteraCommand {
	public async messageRun(message: Message, _args: Args, context: SpecteraCommand.Context) {
		return this.display(message, null, context);
	}

	private async display(message: Message, index: number | null, context: SpecteraCommand.Context) {
		const prefix = this.getCommandPrefix(context);

		const content = 'Displaying one category per page';

		const display = await this.buildDisplay(message, prefix);
		if (index !== null) display.setIndex(index);

		const response = await reply(message, content);
		await display.run(response, message.author);
		return response;
	}

	private async helpCategories(message: Message) {
		const commandsByCategory = await HelpCommand.fetchCommands(message);
		let i = 0;
		const commandCategories: string[] = [];
		for (const [category, commands] of commandsByCategory) {
			const line = String(++i).padStart(2, '0');
			commandCategories.push(`\`${line}.\` **${category}** → ${commands.length} command`);
		}

		const content = commandCategories.join('\n');
		return reply(message, content);
	}

	private getCommandPrefix(context: SpecteraCommand.Context): string {
		return (context.prefix instanceof RegExp && !context.commandPrefix.endsWith(' ')) || UserOrMemberMentionRegex.test(context.commandPrefix)
			? `${context.commandPrefix} `
			: context.commandPrefix;
	}

	private async buildDisplay(message: Message, prefix: string) {
		const commandsByCategory = await HelpCommand.fetchCommands(message);

		const display = new SpecteraPaginatedMessage({
			template: new MessageEmbed().setColor(BrandingColors.Primary)
		}).setSelectMenuOptions((pageIndex) => ({ label: commandsByCategory.at(pageIndex - 1)![0].fullCategory!.join(' → ') }));

		for (const [category, commands] of commandsByCategory) {
			display.addPageEmbed((embed) =>
				embed //
					.setTitle(`${category} Commands`)
					.setDescription(commands.map(this.formatCommand.bind(this, prefix, true)).join('\n'))
			);
		}

		return display;
	}

	private formatCommand(prefix: string, paginatedMessage: boolean, command: SpecteraCommand) {
		const { description } = command;
		return paginatedMessage ? `• ${prefix}${command.name} → ${description}` : `• **${prefix}${command.name}** → ${description}`;
	}

	private static async fetchCommands(message: Message) {
		const commands = container.stores.get('commands');
		const filtered = new Collection<string, SpecteraCommand[]>();
		await Promise.all(
			commands.map(async (cmd) => {
				const command = cmd as SpecteraCommand;
				if (command.hidden) return;

				const result = await cmd.preconditions.run(message, command, { command: null! });
				if (!result.success) return;

				const category = filtered.get(command.fullCategory!.join(' → '));
				if (category) category.push(command);
				else filtered.set(command.fullCategory!.join(' → '), [command as SpecteraCommand]);
			})
		);

		return filtered.sort(sortCommandsAlphabetically);
	}
}

function sortCommandsAlphabetically(_: SpecteraCommand[], __: SpecteraCommand[], firstCategory: string, secondCategory: string): 1 | -1 | 0 {
	if (firstCategory > secondCategory) return 1;
	if (secondCategory > firstCategory) return -1;
	return 0;
}
