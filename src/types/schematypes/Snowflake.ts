import { Snowflake as SnowFlake } from '@sapphire/snowflake';
import { Schema, SchemaType } from 'mongoose';

export class Snowflake extends SchemaType {
	constructor(key, options) {
		super(key, options, 'Snowflake');
	}

	cast(val) {
		const snowflake = new SnowFlake(val);
		return snowflake;
	}
}

// @ts-expect-error Code is valid but typescript doesn't know
Schema.Types.Snowflake = Snowflake;
