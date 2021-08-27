import type { RoleResult } from '#types/interfaces/AnyRoleResult';
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

export const autoRoleSchema = model<RoleResult>(
	'autorole-system',
	AutoRoleSchema
);
