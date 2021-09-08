import { CommandDeniedPayload, Events, Listener, UserError } from '@sapphire/framework';

export class CommandDenied extends Listener<typeof Events.CommandDenied> {
	public async run({ context, message: content }: UserError, { message }: CommandDeniedPayload) {
		if (Reflect.get(Object(context), 'silent')) return;

		return message.reply(content);
	}
}
