import { Snowflake } from '#SchemaTypes/Snowflake';
import { model, Schema } from 'mongoose';

const MuteSchema = new Schema({
	_id: {
		type: Snowflake,
		required: true,
	},

	roleId: {
		type: Snowflake,
		required: true,
	},
});

export const muteRoleSchema = model('mute-role-schema', MuteSchema);
