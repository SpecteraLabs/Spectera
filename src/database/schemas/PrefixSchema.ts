import { Schema, model } from 'mongoose';
import { Snowflake } from '#SchemaTypes/Snowflake';

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

export const commandPrefixSchema = model('guild-prefixes', PrefixSchema);
