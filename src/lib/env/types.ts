export type BooleanString = 'true' | 'false';
export type IntegerString = `${bigint}`;

export type SpecteraEnvAny = keyof SpecteraEnv;
export type SpecteraEnvString = {
	[K in SpecteraEnvAny]: SpecteraEnv[K] extends BooleanString | IntegerString ? never : K;
}[SpecteraEnvAny];
export type SpecteraEnvBoolean = {
	[K in SpecteraEnvAny]: SpecteraEnv[K] extends BooleanString ? K : never;
}[SpecteraEnvAny];
export type SpecteraEnvInteger = {
	[K in SpecteraEnvAny]: SpecteraEnv[K] extends IntegerString ? K : never;
}[SpecteraEnvAny];

export interface SpecteraEnv {
	NODE_ENV: 'test' | 'development' | 'production';
	DOTENV_DEBUG_ENABLED: BooleanString;

	CLIENT_NAME: string;
	CLIENT_VERSION: string;
	CLIENT_PREFIX: string;
	CLIENT_REGEX_PREFIX: string;
	CLIENT_OWNERS: string;
	CLIENT_ID: string;

	CLIENT_PRESENCE_NAME: string;
	CLIENT_PRESENCE_TYPE: string;
	PHISHERMAN_KEY: string;

	WEBSOCKET_PORT: IntegerString;

	DISCORD_TOKEN: string;
	OAUTH2_SECRET: string;
	OAUTH2_COOKIE: string;
	OAUTH2_REDIRECT: string;
	OAUTH2_SCOPE: string;
	OAUTH2_DOMAIN_OVERWRITE: string;
	REDIS_HOST: string;
	REDIS_PASSWORD: string;
}
