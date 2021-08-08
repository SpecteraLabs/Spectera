import axios from 'axios';
import { CallbackFunction } from '../../interfaces/Command';

export const run: CallbackFunction = async (client, message, args) => {
	const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
		args.join(' ')
	)}`;
	axios.get(uri).then((embed) => {
		const { data } = embed;
		if (data && !data.error) {
			message.reply({
				embeds: [data],
				allowedMentions: { repliedUser: false },
			});
		} else {
			message.reply('No result found in documentation!');
		}
	});
};
export const name = 'docs';
export const category = 'misc';
export const aliases = ['rtfm'];
export const usage = '<query>';
export const args = true;
