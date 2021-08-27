import { Schema, model } from 'mongoose';
import type { PrefixResult } from '#types/interfaces/PrefixResult';

const PrefixSchema = new Schema({
	_id: {
		type: String,
		required: true,
	},

	prefix: {
		type: String,
		required: true,
	},
});

export const commandPrefixSchema = model<PrefixResult>(
	'guild-prefixes',
	PrefixSchema
);
