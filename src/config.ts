process.env.NODE_ENV ??= 'development';

import { envParseArray, envParseBoolean, envParseString } from './lib/env';
import { srcFolder } from '#lib/constants';
import { LogLevel } from '@sapphire/framework';
import type { ActivitiesOptions, ActivityType, ClientOptions } from 'discord.js';
import { config } from 'dotenv-cra';
import { join } from 'path';

config({
	debug: process.env.DOTENV_DEBUG_ENABLED ? envParseBoolean('DOTENV_DEBUG_ENABLED') : undefined,
	path: join(srcFolder, '.env')
});

export const OWNERS = envParseArray('CLIENT_OWNERS');

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
			type: envParseString('CLIENT_PRESENCE_TYPE', 'LISTENING') as ActivityType
		}
	];
}

export const CLIENT_OPTIONS: ClientOptions = {
	intents: ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES', 'GUILD_MESSAGE_REACTIONS'],
	defaultPrefix: envParseString('CLIENT_PREFIX'),
	regexPrefix: parseRegExpPrefix(),
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
			port: 5000
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
