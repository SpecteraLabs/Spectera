import { MessageCommandDeniedPayload, Events, Listener, UserError } from '@sapphire/framework';

export class CommandDenied extends Listener<typeof Events.MessageCommandDenied> {
	public async run({ context, message: content }: UserError, { message }: MessageCommandDeniedPayload) {
		if (Reflect.get(Object(context), 'silent')) return;

		return message.reply(content);
	}
}
