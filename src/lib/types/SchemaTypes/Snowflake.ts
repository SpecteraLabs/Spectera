import { Snowflake as SnowFlake } from '@sapphire/snowflake';
import { Schema, SchemaType } from 'mongoose';

export class Snowflake extends SchemaType {
	public constructor(key: string, options: unknown) {
		super(key, options, 'Snowflake');
	}

	public cast(val: unknown) {
		const value = Number(val);
		if (isNaN(value)) {
			throw new Error(`Snowflake: ${val} is not a number`);
		}
		const snowflake = new SnowFlake(value);
		return snowflake;
	}
}

Schema.Types.Snowflake = Snowflake;

declare module 'mongoose' {
	namespace Schema {
		namespace Types {
			class Snowflake extends SchemaType {}
		}
	}
}
