import type { SnowflakeArray } from '#SchemaTypes/SnowflakeArray';
import type { Snowflake } from '@sapphire/snowflake';
import type { Document } from 'mongoose';

export interface SchemaResult extends Document {
	prefix:
		| {
				type: string;
				required: boolean;
		  }
		| any;

	roleId: {
		type: Snowflake;
		required: boolean;
	};

	channelId: {
		type: Snowflake;
		required: boolean;
	};

	roles: {
		type: SnowflakeArray | Array<Snowflake>;
		required: boolean;
	};
}
