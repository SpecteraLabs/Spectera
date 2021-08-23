import { Snowflake as SnowFlake } from '@sapphire/snowflake';
import { Schema, SchemaType } from 'mongoose';

export class Snowflake extends SchemaType {
	constructor(key, options) {
		super(key, options, 'flake');
	}

	cast(val) {
		const snowflake = new SnowFlake(val);
		return snowflake;
	}
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Schema.Types.Snowflake = Snowflake;