import { SpecteraCommand } from '#structures/SpecteraCommand';
import { ApplyOptions } from '@sapphire/decorators';
import { Message, MessageEmbed } from 'discord.js';
import type { Args } from '@sapphire/framework';
import { PermissionLevels } from '#types/enums/PermissionLevels';
import { codeBlock, isThenable } from '@sapphire/utilities';
import { Type } from '@sapphire/type';
import { inspect } from 'util';
import { reply } from '@sapphire/plugin-editable-commands';
import { Stopwatch } from '@sapphire/stopwatch';
import { codeBlockRegExp } from '#lib/constants';

@ApplyOptions<SpecteraCommand.Options>({
	aliases: ['ev'],
	description: 'Evals any JavaScript code',
	flags: ['async', 'hidden', 'silent', 's', 'showHidden'],
	permissionLevel: PermissionLevels.BotOwner,
	quotes: [],
	options: ['depth'],
	hidden: true
})
export class Eval extends SpecteraCommand {
	public async messageRun(message: Message, args: Args) {
		let code = await args.rest('string');
		if (codeBlockRegExp.test(code)) {
			const output = codeBlockRegExp.exec(code)!;
			// eslint-disable-next-line prefer-destructuring
			code = output[2];
		}

		const EvalEmbed = new MessageEmbed().setTitle('Output').setColor('WHITE');
		const { result, success, timer, type } = await this.eval(message, code, {
			async: args.getFlags('async'),
			depth: Number(args.getOption('depth')) ?? 0,
			showHidden: args.getFlags('hidden', 'showHidden')
		});

		const Type = codeBlock('ts', type);
		const output = success ? codeBlock('js', result) : `**ERROR**: ${codeBlock('bash', result)}`;
		EvalEmbed.setDescription(output).setFooter(`⏱️ Time Taken: ${timer}`).addField('Type:', `${Type}`);
		if (args.getFlags('silent', 's')) return null;

		if (output.length > 2000) {
			return reply(message, {
				content: `Output was too long... sent the result as a file.`,
				files: [{ attachment: Buffer.from(output), name: 'output.js' }]
			});
		}

		return reply(message, { embeds: [EvalEmbed] });
	}

	private async eval(message: Message, code: string, flags: { async: boolean; depth: number; showHidden: boolean }) {
		if (flags.async) code = `(async () => {\n${code}\n})();`;

		let success = true;
		let result = null;
		let timer;
		// @ts-expect-error I can use this as an alias
		const msg = message;

		try {
			timer = new Stopwatch();
			// eslint-disable-next-line no-eval
			result = eval(code);
			timer.stop();
		} catch (error) {
			if (error && error instanceof Error && error.stack) {
				this.container.client.logger.error(error);
			}
			result = error;
			success = false;
		}

		const type = new Type(result).toString();
		if (isThenable(result)) result = await result;

		if (typeof result !== 'string') {
			result = inspect(result, {
				depth: flags.depth,
				showHidden: flags.showHidden
			});
		}

		return { result, success, timer, type };
	}
}
