import { ApplyOptions } from '@sapphire/decorators';
import { SpecteraCommand } from '#structures/SpecteraCommand';
import type { Message } from 'discord.js';
import type { Args } from '@sapphire/framework';
import type { Tag } from '#types/interfaces/Tag';
import { codeBlockRegExp } from '#lib/constants';
import { reply } from '@sapphire/plugin-editable-commands';

@ApplyOptions<SpecteraCommand.Options>({
	description: 'Manage tags system in your server',
	options: ['name', 'description'],
	subCommands: ['create', 'remove', 'edit']
})
export class TagCommand extends SpecteraCommand {
	public async create(message: Message, args: Args) {
		const name = args.getOption('name')!;
		const description = args.getOption('description')!;
		const codeblock = await args.rest('string');
		if (!codeBlockRegExp.test(codeblock)) return reply(message, 'The code should be in a code block!');
		const runFunction = codeBlockRegExp.exec(codeblock)![2];
		if (runFunction.includes('process.env') || runFunction.includes('env')) return reply(message, 'You cannot use process.env for tags!');
		if (runFunction.includes('container')) return reply(message, 'You cannot access the container in tags!');
		if (runFunction.includes('process')) return reply(message, 'You cannot use process in tags!');
		if (runFunction.includes('import ') || runFunction.includes('require(') || runFunction.includes('export ') || runFunction.includes('exports'))
			return reply(message, 'You cannot use imports/exports in tags!');
		if (runFunction.includes('eval') || runFunction.includes('Function')) return reply(message, 'You cannot use eval in tags!');
		let tag: Tag | string = {
			name,
			description,
			run: `(async () => {\n${runFunction}\n})()`
		};
		// eslint-disable-next-line func-names
		tag = JSON.stringify(tag);
		await this.container.database.guildSettings.update({
			where: { id: message.guild!.id },
			data: {
				tags: {
					push: tag
				}
			}
		});
		return reply(message, `Added tag with name ${name}`);
	}
}
