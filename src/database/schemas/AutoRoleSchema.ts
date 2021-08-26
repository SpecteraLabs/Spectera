import { Snowflake } from '#SchemaTypes/Snowflake';
import type { SchemaResult } from '#types/interfaces/SchemaOutput';
import { Schema, model } from 'mongoose';
const AutoRoleSchema = new Schema({
	_id: {
		type: Snowflake,
		required: true,
	},

	roleId: {
		type: Snowflake,
		required: true,
	},
});

export const autoRoleSchema = model<SchemaResult>(
	'autorole-system',
	AutoRoleSchema
);
