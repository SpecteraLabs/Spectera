import { SapphireClient } from '@sapphire/framework';
import ConfigJSON from '../config.json';
const { token } = ConfigJSON;

const client = new SapphireClient({
	defaultPrefix: '+',
	intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS'],
	partials: ['GUILD_MEMBER', 'CHANNEL', 'MESSAGE', 'USER', 'REACTION'],
});

client.login(token);
