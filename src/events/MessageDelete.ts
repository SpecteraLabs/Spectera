import { CallbackFunction } from '../interfaces/Event'

export const run: CallbackFunction = async(client, message) => {
	client.snipes.set(message.channel.id, {
		content: message.content,
		author: message.author.tag,
		member: message.member,
		image: message.attachments.first() ? message.attachments.first().proxyURL : null,
	});
}