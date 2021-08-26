import { Schema, model } from 'mongoose';
import { Snowflake } from '#SchemaTypes/Snowflake';

const LoggingSchema = new Schema({
	_id: {
		type: Snowflake,
		required: true,
	},

	channelId: {
		type: Snowflake,
		required: true,
	},
});

export const messageLogSchema = model('message-log-channels', LoggingSchema);
