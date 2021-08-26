import { Schema, model } from 'mongoose';
import { Snowflake } from '#SchemaTypes/Snowflake';
import type { SchemaResult } from '#types/interfaces/SchemaOutput';

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

export const messageLogSchema = model<SchemaResult>(
	'message-log-channels',
	LoggingSchema
);
