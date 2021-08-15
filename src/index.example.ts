import { SapphireClient } from '@sapphire/framework';
import { token } from './config.example.json';

const client = new SapphireClient({
	defaultPrefix: '+',
	intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS'],
	partials: ['GUILD_MEMBER', 'CHANNEL', 'MESSAGE', 'USER', 'REACTION'],
});

client.login(token);
