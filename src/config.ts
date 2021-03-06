process.env.NODE_ENV ??= 'development';

import { envParseArray, envParseBoolean, envParseString } from './lib/env';
import { container, LogLevel } from '@sapphire/framework';
import type { ActivitiesOptions, ClientOptions } from 'discord.js';
import { config } from 'dotenv-cra';
import type { InternationalizationContext } from '@sapphire/plugin-i18next';

config({
	debug: process.env.DOTENV_DEBUG_ENABLED ? envParseBoolean('DOTENV_DEBUG_ENABLED') : undefined
});

export const OWNERS = envParseArray('CLIENT_OWNERS');
export const PHISHERMAN_KEY = envParseString('PHISHERMAN_KEY');

function parseRegExpPrefix(): RegExp | undefined {
	const { CLIENT_REGEX_PREFIX } = process.env;
	return CLIENT_REGEX_PREFIX ? new RegExp(CLIENT_REGEX_PREFIX, 'i') : undefined;
}

function parsePresenceActivity(): ActivitiesOptions[] {
	const { CLIENT_PRESENCE_NAME } = process.env;
	if (!CLIENT_PRESENCE_NAME) return [];

	return [
		{
			name: CLIENT_PRESENCE_NAME,
			type: process.env.CLIENT_PRESENCE_TYPE as any
		}
	];
}

export const CLIENT_OPTIONS: ClientOptions = {
	intents: ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES', 'GUILD_MESSAGE_REACTIONS'],
	defaultPrefix: envParseString('CLIENT_PREFIX'),
	regexPrefix: parseRegExpPrefix(),
	loadMessageCommandListeners: true,
	i18n: {
		fetchLanguage: async (context: InternationalizationContext) => {
			if (!context.guild) return 'en-US';
			const result = await container.database.guildSettings.findUnique({
				where: {
					id: context.guild?.id
				}
			});
			if (!result || !result.language) return 'en-US';
			return result.language;
		}
	},
	hmr: {
		enabled: process.env.NODE_ENV === 'development'
	},
	api: {
		auth: {
			id: envParseString('CLIENT_ID'),
			secret: envParseString('OAUTH2_SECRET'),
			cookie: envParseString('OAUTH2_COOKIE'),
			scopes: envParseArray('OAUTH2_SCOPE'),
			transformers: [],
			domainOverwrite: envParseString('OAUTH2_DOMAIN_OVERWRITE')
		},
		prefix: '/api',
		origin: 'https://localhost:3000',
		listenOptions: {
			port: 5009
		}
	},
	logger: {
		level: envParseString('NODE_ENV') === 'production' ? LogLevel.Info : LogLevel.Debug
	},
	presence: {
		activities: parsePresenceActivity()
	},
	caseInsensitiveCommands: true,
	caseInsensitivePrefixes: true
};
