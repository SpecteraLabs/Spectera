import { Snowflake } from '#SchemaTypes/Snowflake';
import { Schema, model } from 'mongoose';
const AutoRoleSchema = new Schema({
	_id: {
		type: Snowflake,
		required: true,
	},

	roleId: {
		type: Snowflake,
		required: true,
	},
});

export const autoRoleSchema = model('autorole-system', AutoRoleSchema);
