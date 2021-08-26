import { Snowflake } from '#SchemaTypes/Snowflake';
import type { SchemaResult } from '#types/interfaces/SchemaOutput';
import { model, Schema } from 'mongoose';

const MuteSchema = new Schema({
	_id: {
		type: Snowflake,
		required: true,
	},

	roleId: {
		type: Snowflake,
		required: true,
	},
});

export const muteRoleSchema = model<SchemaResult>(
	'mute-role-schema',
	MuteSchema
);
