import { autoRoleSchema } from '#schemas/AutoRoleSchema';
import { messageLogSchema } from '#schemas/LoggingSchema';
import { modRoleSchema } from '#schemas/ModRoleSchema';
import { muteRoleSchema } from '#schemas/MuteRoleSchema';
import { commandPrefixSchema } from '#schemas/PrefixSchema';
import { container } from '@sapphire/framework';
import '@sapphire/pieces';
import mongoose, { Model } from 'mongoose';
import type { PrefixResult } from '#types/interfaces/PrefixResult';
import type { RoleResult } from '#types/interfaces/AnyRoleResult';
import type { ChannelResult } from '#types/interfaces/AnyChannelResult';
import type { RolesResult } from '#types/interfaces/RolesResult';
import { blueBright, bold } from 'colorette';
import { MONGO_URL } from '../config';

export class Database {
	public readonly connection: mongoose.Connection | undefined;
	public prefixes: Model<PrefixResult> = commandPrefixSchema;
	public modroles: Model<RolesResult> = modRoleSchema;
	public autoroles: Model<RoleResult> = autoRoleSchema;
	public logchannels: Model<ChannelResult> = messageLogSchema;
	public muteroles: Model<RoleResult> = muteRoleSchema;

	public constructor(connection?: mongoose.Connection) {
		this.connection = connection;
	}

	public static async connect() {
		const mongo = await mongoose.connect(MONGO_URL);
		container.logger.info(bold(blueBright('Connected to the database!')));
		return new Database(mongo.connection);
	}
}
container.database = new Database();
