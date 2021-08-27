import { Schema, model } from 'mongoose';
import type { ChannelResult } from '#types/interfaces/AnyChannelResult';

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

export const messageLogSchema = model<ChannelResult>(
	'message-log-channels',
	LoggingSchema
);
