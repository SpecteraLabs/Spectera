import { BrandingColors } from '#lib/constants';
import { SpecteraCommand } from '#structures/SpecteraCommand';
import { SpecteraPaginatedMessage } from '#structures/SpecteraPaginatedMessage';
import { ApplyOptions } from '@sapphire/decorators';
import { UserOrMemberMentionRegex } from '@sapphire/discord.js-utilities';
import { Args, container } from '@sapphire/framework';
import { reply } from '@sapphire/plugin-editable-commands';
import { Collection, Message, MessageEmbed } from 'discord.js';

function sortCommandsAlphabetically(_: SpecteraCommand[], __: SpecteraCommand[], firstCategory: string, secondCategory: string): 1 | -1 | 0 {
	if (firstCategory > secondCategory) return 1;
	if (secondCategory > firstCategory) return -1;
	return 0;
}

@ApplyOptions<SpecteraCommand.Options>({
	aliases: ['commands', 'cmd', 'cmds'],
	description: 'Displays all commands or the description of one.',
	flags: ['cat', 'categories', 'all']
})
export class Help extends SpecteraCommand {
	public async run(message: Message, args: SpecteraCommand.Args, context: SpecteraCommand.Context) {
		if (args.finished) {
			if (args.getFlags('cat', 'categories')) return this.helpCategories(message, args);
			if (args.getFlags('all')) return this.all(message, context);
			return this.display(message, args, null, context);
		}

		const command = await args.pick('string');
		if (container.stores.get('commands').findKey((cmd: any) => cmd.name === command)) return;

		const category = await args.pickResult(Help.categories);
		if (category.success) return this.display(message, args, category.value - 1, context);

		const page = await args.pickResult('integer', { minimum: 0 });
		if (page.success) return this.display(message, args, page.value - 1, context);
		return this.display(message, args, null, context);
	}

	private async helpCategories(message: Message, _args: SpecteraCommand.Args) {
		const commandsByCategory = await Help.fetchCommands(message);
		let i = 0;
		const commandCategories: string[] = [];
		for (const [category, commands] of commandsByCategory) {
			const line = String(++i).padStart(2, '0');
			commandCategories.push(`\`${line}.\` **${category}**: ${commands.length} command`);
		}

		const content = commandCategories.join('\n');
		return reply(message, content);
	}

	private static categories = Args.make<number>(async (parameter, { argument, message }) => {
		const lowerCasedParameter = parameter.toLowerCase();
		const commandsByCategory = await Help.fetchCommands(message);
		for (const [page, category] of [...commandsByCategory.keys()].entries()) {
			if (category.toLowerCase() === lowerCasedParameter) return Args.ok(page + 1);
		}

		return Args.error({ argument, parameter });
	});

	private async all(message: Message, context: SpecteraCommand.Context) {
		const content = await this.buildHelp(message, context.commandPrefix);
		return reply(message, { embeds: [new MessageEmbed().setDescription(content).setColor(BrandingColors.Primary)] });
	}

	private async buildHelp(message: Message, prefix: string) {
		const commands = await Help.fetchCommands(message);

		const helpMessage: string[] = [];
		for (const [category, list] of commands) {
			helpMessage.push(`**${category} Commands**:\n`, list.map(this.formatCommand.bind(this, prefix, false)).join('\n'), '');
		}

		return helpMessage.join('\n');
	}

	private async display(message: Message, _args: SpecteraCommand.Args, index: number | null, context: SpecteraCommand.Context) {
		const prefix = this.getCommandPrefix(context);

		const content = `Displaying one category per page. Have issues with the embed? Run \`${prefix}help --all\` for a full list in DMs`;

		const display = await this.buildDisplay(message, prefix);
		if (index !== null) display.setIndex(index);

		const response = await reply(message, content);
		await display.run(response, message.author);
		return response;
	}

	private getCommandPrefix(context: SpecteraCommand.Context): string {
		return (context.prefix instanceof RegExp && !context.commandPrefix.endsWith(' ')) || UserOrMemberMentionRegex.test(context.commandPrefix)
			? `${context.commandPrefix} `
			: context.commandPrefix;
	}

	private formatCommand(prefix: string, paginatedMessage: boolean, command: SpecteraCommand) {
		const { description } = command;
		return paginatedMessage ? `• ${prefix}${command.name}: ${description}` : `• **${prefix}${command.name}**: ${description}`;
	}

	private static async fetchCommands(message: Message) {
		const commands = container.stores.get('commands');
		const filtered = new Collection<string, SpecteraCommand[]>();
		await Promise.all(
			commands.map(async (cmd) => {
				const command = cmd as SpecteraCommand;
				if (command.hidden) return;
				if (!command.category) return;

				const result = await cmd.preconditions.run(message, command, { command: null! });
				if (!result.success) return;

				const category = filtered.get(command.fullCategory!.join(': '));
				if (category) category.push(command);
				else filtered.set(command.fullCategory!.join(': '), [command as SpecteraCommand]);
			})
		);

		return filtered.sort(sortCommandsAlphabetically);
	}

	private async buildDisplay(message: Message, prefix: string) {
		const commandsByCategory = await Help.fetchCommands(message);

		const display = new SpecteraPaginatedMessage(
			{
				template: new MessageEmbed().setColor(BrandingColors.Primary)
			},
			10 * 6000
		);

		for (const [category, commands] of commandsByCategory) {
			display.addPageEmbed((embed) =>
				embed.setTitle(`${category} Commands`).setDescription(commands.map(this.formatCommand.bind(this, prefix, true)).join('\n'))
			);
		}

		return display;
	}
}
