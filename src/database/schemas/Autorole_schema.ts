import { Schema, model } from 'mongoose';
const AutoRoleSchema = new Schema({
	_id: {
		type: String,
		required: true,
	},

	roleId: {
		type: String,
		required: true,
	},
});

export const Model = model('autorole-system', AutoRoleSchema);
