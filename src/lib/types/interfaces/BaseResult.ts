import type { Document } from 'mongoose';

export interface BaseResult extends Document {
	_id: string | null;
}
