import { Guild } from 'discord.js';
import { CallbackFunction } from '../interfaces/Event';
import { muteRoleSchema } from '../mongodb/schemas/MuteRoleSchema';

export const run: CallbackFunction = async (
	client,
	oldGuild: Guild,
	newGuild: Guild
) => {
	const channela = newGuild.channels.cache.find(
		(ch) => !oldGuild.channels.cache.has(ch.id)
	);
	const result = await muteRoleSchema.findOne({ _id: newGuild.id });
	const muterole = newGuild.roles.cache.find((r) => r.id === result.roleId);
	if (channela.isThread() || !muterole) return;
	await channela.permissionOverwrites.create(muterole, {
		SEND_MESSAGES: false,
		CONNECT: false,
		ADD_REACTIONS: false,
	});
};
