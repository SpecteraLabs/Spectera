export type BooleanString = 'true' | 'false';
export type IntegerString = `${bigint}`;

export type ObligatorEnvAny = keyof ObligatorEnv;
export type ObligatorEnvString = {
	[K in ObligatorEnvAny]: ObligatorEnv[K] extends BooleanString | IntegerString
		? never
		: K;
}[ObligatorEnvAny];
export type ObligatorEnvBoolean = {
	[K in ObligatorEnvAny]: ObligatorEnv[K] extends BooleanString ? K : never;
}[ObligatorEnvAny];
export type ObligatorEnvInteger = {
	[K in ObligatorEnvAny]: ObligatorEnv[K] extends IntegerString ? K : never;
}[ObligatorEnvAny];

export interface ObligatorEnv {
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

	WEBSOCKET_PORT: IntegerString;

	DISCORD_TOKEN: string;
	MONGO_URL: string;
}
