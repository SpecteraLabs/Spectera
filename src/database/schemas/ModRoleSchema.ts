import { SnowflakeArray } from '#SchemaTypes/SnowflakeArray';
import type { SchemaResult } from '#types/interfaces/SchemaOutput';
import { model, Schema } from 'mongoose';

const ModSchema = new Schema({
	_id: {
		type: SnowflakeArray,
		required: true,
	},

	roleIds: {
		type: Array,
		required: true,
	},
});

export const modRoleSchema = model<SchemaResult>('mod-roles', ModSchema);
