import { Schema, model } from 'mongoose';
import { Snowflake } from '#SchemaTypes/Snowflake';
import type { SchemaResult } from '#types/interfaces/SchemaOutput';

const PrefixSchema = new Schema({
	_id: {
		type: Snowflake,
		required: true,
	},

	prefix: {
		type: String,
		required: true,
	},
});

export const commandPrefixSchema = model<SchemaResult>(
	'guild-prefixes',
	PrefixSchema
);
