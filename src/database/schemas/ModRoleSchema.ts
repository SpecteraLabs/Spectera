import type { RolesResult } from '#types/interfaces/RolesResult';
import { model, Schema } from 'mongoose';

const ModSchema = new Schema({
	_id: {
		type: String,
		required: true,
	},

	roleIds: {
		type: Array,
		required: true,
	},
});

export const modRoleSchema = model<RolesResult>('mod-roles', ModSchema);
