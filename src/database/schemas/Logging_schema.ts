import { Schema, model } from 'mongoose';

const LoggingSchema = new Schema({
	_id: {
		type: String,
		required: true,
	},

	channelId: {
		type: String,
		required: true,
	},
});

export const messageLogSchema = model('message-log-channels', LoggingSchema);