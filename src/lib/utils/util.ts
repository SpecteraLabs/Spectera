import { TwemojiRegex } from '@sapphire/discord-utilities';

export const kRegExpUnicodeBoxNumber = /^\d\u20E3$/;
export const kRegExpFormattedCustomEmoji = /<a?:\w{2,32}:\d{17,18}>/;
export const kRegExpParsedCustomEmoji = /a?:\w{2,32}:\d{17,18}/;
export const kRegExpParsedFormattedCustomEmoji = /^a?:[^:]+:\d{17,19}$/;
export const kRegExpCustomEmojiParts = /^(a?):([^:]+):(\d{17,19})$/;
export const kRegExpTwemoji = new RegExp(TwemojiRegex, '');

export interface EmojiObject extends EmojiObjectPartial {
	animated?: boolean;
}

export interface EmojiObjectPartial {
	name: string | null;
	id: string | null;
}

export function resolveEmoji(emoji: string | EmojiObject): string | null {
	if (typeof emoji === 'string') {
		if (kRegExpFormattedCustomEmoji.test(emoji)) return emoji.slice(1, -1);
		if (kRegExpParsedCustomEmoji.test(emoji)) return emoji;
		if (kRegExpUnicodeBoxNumber.test(emoji)) return encodeURIComponent(emoji);
		if (kRegExpTwemoji.test(emoji)) return encodeURIComponent(emoji);
		return null;
	}

	return emoji.name
		? emoji.id
			? `${emoji.animated ? 'a' : ''}:${emoji.name.replace(/~\d+/, '')}:${emoji.id}`
			: encodeURIComponent(emoji.name)
		: emoji.id;
}
