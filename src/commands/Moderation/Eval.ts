import { SpecteraCommand } from '#structures/SpecteraCommand';
import { ApplyOptions } from '@sapphire/decorators';
import { Message, MessageEmbed } from 'discord.js';
import type { Args } from '@sapphire/framework';
import { PermissionLevels } from '#types/enums/PermissionLevels';
import { codeBlock, isThenable } from '@sapphire/utilities';
import { Type } from '@sapphire/type';
import { inspect } from 'util';
import { send } from '@skyra/editable-commands';
import { Stopwatch } from '@sapphire/stopwatch';

@ApplyOptions<SpecteraCommand.Options>({
	aliases: ['ev'],
	description: 'Evals any JavaScript code',
	flags: ['async', 'hidden', 'silent', 's', 'showHidden'],
	quotes: [['```js', '```']],
	permissionLevel: PermissionLevels.BotOwner,
	options: ['depth'],
	hidden: true
})
export class Eval extends SpecteraCommand {
	public async run(message: Message, args: Args) {
		const code = await args.pick('string');

		const EvalEmbed = new MessageEmbed().setTitle('Output').setColor('WHITE');
		const { result, success, type, timer } = await this.eval(message, code, {
			async: args.getFlags('async'),
			depth: Number(args.getOption('depth')) ?? 0,
			showHidden: args.getFlags('hidden', 'showHidden')
		});

		const Type = codeBlock('ts', type);
		const output = success ? codeBlock('js', result) : `**ERROR**: ${codeBlock('bash', result)}`;
		EvalEmbed.setDescription(output).setFooter(`⏱️ Time Taken: ${timer}`).addField('Type:', `${Type}`);
		if (args.getFlags('silent', 's')) return null;

		if (output.length > 2000) {
			return send(message, {
				content: `Output was too long... sent the result as a file.`,
				files: [{ attachment: Buffer.from(output), name: 'output.js' }]
			});
		}

		return send(message, { embeds: [EvalEmbed] });
	}

	private async eval(message: Message, code: string, flags: { async: boolean; depth: number; showHidden: boolean }) {
		if (flags.async) code = `(async () => {\n${code}\n})();`;

		let success = true;
		let result = null;
		let timer;
		// @ts-expect-error Code is correct
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

		return { result, success, type, timer };
	}
}
