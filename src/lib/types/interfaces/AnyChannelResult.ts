import type { Document } from 'mongoose';

export interface ChannelResult extends Document {
	channelId: string;
}
