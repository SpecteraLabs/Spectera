import { ChatInputCommandDeniedPayload, Events, Listener, UserError } from '@sapphire/framework';

export class ChatInputCommandDenied extends Listener<typeof Events.ChatInputCommandDenied> {
	public async run({ context, message: content }: UserError, { interaction }: ChatInputCommandDeniedPayload) {
		if (Reflect.get(Object(context), 'silent')) return;

		return interaction.reply({ content, ephemeral: true });
	}
}
