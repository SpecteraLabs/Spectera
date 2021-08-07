import { mongo } from "./database/mongo";
import { commandPrefixSchema } from "./database/schemas/Prefix_schema";
import { Obligator } from "./client/Client";
import ConfigJSON from '../config.json';
const { prefix: globalPrefix } = ConfigJSON;
export const guildPrefixes = {}

export const loadPrefixes = async (client: Obligator) => {
	await mongo().then(async () => {
		for (const guild of client.guilds.cache) {
			const guildId = guild[1].id;

			const result = await commandPrefixSchema.findOne({ _id: guildId });
			guildPrefixes[guildId] = result ? result.prefix : globalPrefix;
			client.logger.info(guildPrefixes);
		}
	});
};
