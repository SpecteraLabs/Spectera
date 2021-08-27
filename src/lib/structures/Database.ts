import type { autoRoleSchema } from '#schemas/AutoRoleSchema';
import type { messageLogSchema } from '#schemas/LoggingSchema';
import type { modRoleSchema } from '#schemas/ModRoleSchema';
import type { muteRoleSchema } from '#schemas/MuteRoleSchema';
import type { commandPrefixSchema } from '#schemas/PrefixSchema';
import '@sapphire/pieces';

export class Database {
	public prefixes: typeof commandPrefixSchema | undefined;
	public modroles: typeof modRoleSchema | undefined;
	public autoroles: typeof autoRoleSchema | undefined;
	public logchannels: typeof messageLogSchema | undefined;
	public muteroles: typeof muteRoleSchema | undefined;
}

declare module '@sapphire/pieces' {
	interface Container {
		database: Database;
	}
}
