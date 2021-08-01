import { Schema, model } from 'mongoose';

const messageLogSchema = new Schema({
	_id: {
		type: String,
		required: true,
	},

	channelId: {
		type: String,
		required: true,
	},
});

export const Model = model('message-log-channels', messageLogSchema);