import { Message, MessageEmbed, TextChannel } from 'discord.js';
import { join } from 'path';
import { fetch } from '@sapphire/fetch';
import { PHISHERMAN_KEY } from '#root/config';
import { isScam } from './utils/util';

export const rootFolder = join(__dirname, '..', '..');
export const srcFolder = join(rootFolder, 'src');

export const enum Emojis {
	Loading = '<a:loading:730555789730775042>',
	GreenTick = '<:greenTick:637706251253317669>',
	RedCross = '<:redCross:637706251257511973>'
}

export const LoadingMessages = [
	`${Emojis.Loading} Watching hamsters run...`,
	`${Emojis.Loading} Finding people at hide-and-seek...`,
	`${Emojis.Loading} Trying to figure out this command...`,
	`${Emojis.Loading} Fetching data from the cloud...`,
	`${Emojis.Loading} Calibrating lenses...`,
	`${Emojis.Loading} Playing rock, paper, scissors...`,
	`${Emojis.Loading} Tuning in to the right frequencies...`,
	`${Emojis.Loading} Reticulating splines...`
];

export const enum BrandingColors {
	Primary = 0x8f82ff,
	Secondary = 0xdd5e53
}

export const codeBlockRegExp = /\n*```(?:(\S+)\n)?\s*([^]+?)\s*```/i;
export const uriRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

export interface phisherFetch {
	verifiedPhish: boolean;
	classification: 'safe' | 'unknown' | 'suspicious' | 'malicious';
}

export function buildPhishLog(message: Message, url: string, classification: phisherFetch['classification']) {
	return new MessageEmbed()
		.setTitle('Phish Caught')
		.setColor(BrandingColors.Primary)
		.setTimestamp()
		.setFooter({ text: `id: ${message.author.id}` })
		.setDescription(
			`${url} has been caught by phisherman! in #${(message.channel as TextChannel).name}\nLink sent by **${
				message.author.tag
			}\n**Link is ${classification}`
		);
}

export const checkv2Scam = async (domain: string) => {
	const result = await fetch<phisherFetch>(`https://api.phisherman.gg/v2/domains/check/${domain}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${PHISHERMAN_KEY}`
		}
	});
	return isScam(result.classification);
};

export const checkv1Scam = async (domain: string) => {
	const result = await fetch(`https://api.phisherman.gg/v1/domains/${domain}`);
	return result;
};
