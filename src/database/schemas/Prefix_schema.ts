import { Schema, model } from 'mongoose';

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

export const Model = model('guild-prefixes', PrefixSchema);
