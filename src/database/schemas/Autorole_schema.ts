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

export const autoRoleSchema = model('autorole-system', AutoRoleSchema);
