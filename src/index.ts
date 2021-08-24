import { SapphireClient } from '@sapphire/framework';
import { commandPrefixSchema } from './database/schemas/PrefixSchema';
import { token } from './config/config.json';

const client = new SapphireClient({
	fetchPrefix: async (message) => {
		const { guildId } = message;
		const result = await commandPrefixSchema.findOne({
			_id: guildId,
		});
		return result ? result.prefix : '+';
	},
	caseInsensitivePrefixes: true,
	caseInsensitiveCommands: true,
	intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS'],
	partials: ['GUILD_MEMBER', 'CHANNEL', 'MESSAGE', 'USER', 'REACTION'],
});

client.login(token);
