import type { ObligatorEnv, ObligatorEnvAny, ObligatorEnvBoolean, ObligatorEnvInteger, ObligatorEnvString } from './types';
import { isNullishOrEmpty } from '@sapphire/utilities';

export function envParseInteger(key: ObligatorEnvInteger, defaultValue?: number): number {
	const value = process.env[key];
	if (isNullishOrEmpty(value)) {
		if (defaultValue === undefined) throw new Error(`[ENV] ${key} - The key must be an integer, but is empty or undefined.`);
		return defaultValue;
	}

	const integer = Number(value);
	if (Number.isInteger(integer)) return integer;
	throw new Error(`[ENV] ${key} - The key must be an integer, but received '${value}'.`);
}

export function envParseBoolean(key: ObligatorEnvBoolean, defaultValue?: boolean): boolean {
	const value = process.env[key];
	if (isNullishOrEmpty(value)) {
		if (defaultValue === undefined) throw new Error(`[ENV] ${key} - The key must be a boolean, but is empty or undefined.`);
		return defaultValue;
	}

	if (value === 'true') return true;
	if (value === 'false') return false;
	throw new Error(`[ENV] ${key} - The key must be a boolean, but received '${value}'.`);
}

export function envParseString<K extends ObligatorEnvString>(key: K, defaultValue?: ObligatorEnv[K]): ObligatorEnv[K] {
	const value: any = process.env[key];
	if (isNullishOrEmpty(value)) {
		if (defaultValue === undefined) throw new Error(`[ENV] ${key} - The key must be a string, but is empty or undefined.`);
		return defaultValue;
	}

	return value;
}

export function envParseArray(key: ObligatorEnvString, defaultValue?: string[]): string[] {
	const value = process.env[key];
	if (isNullishOrEmpty(value)) {
		if (defaultValue === undefined) throw new Error(`[ENV] ${key} - The key must be an array, but is empty or undefined.`);
		return defaultValue;
	}

	return value.split(' ');
}

export function envIsDefined(...keys: readonly ObligatorEnvAny[]): boolean {
	return keys.every((key) => !isNullishOrEmpty(process.env[key]));
}
