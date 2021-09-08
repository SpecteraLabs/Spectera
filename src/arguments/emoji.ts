import { resolveEmoji } from '#lib/utils/util';
import { Argument, ArgumentContext } from '@sapphire/framework';

export class EmojiArg extends Argument<string> {
	public async run(parameter: string, context: ArgumentContext<string>) {
		const resolved = resolveEmoji(parameter);
		if (resolved === null) return this.error({ parameter, message: 'This is not a valid emoji!', context });
		return this.ok(resolved);
	}
}
