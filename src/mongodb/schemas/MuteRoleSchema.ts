import { model, Schema } from "mongoose";

const MuteSchema = new Schema({
	_id: {
		type: String,
		required: true,
	},

	roleId: {
		type: String,
		required: true,
	},
})

export const muteRoleSchema = model('mute-role-schema', MuteSchema)