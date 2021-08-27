import type { RoleResult } from '#types/interfaces/AnyRoleResult';
import { model, Schema } from 'mongoose';

const MuteSchema = new Schema({
	_id: {
		type: String,
		required: true,
	},

	roleId: {
		type: String,
		required: true,
	},
});

export const muteRoleSchema = model<RoleResult>('mute-role-schema', MuteSchema);
