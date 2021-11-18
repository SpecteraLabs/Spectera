import type { Config } from '@jest/types';

export default async (): Promise<Config.InitialOptions> => ({
	coverageProvider: 'v8',
	displayName: 'unit test',
	testEnvironment: 'node',
	testRunner: 'jest-circus/runner',
	testMatch: ['<rootDir>/tests/**/*.test.ts'],
	moduleNameMapper: {
		'^#lib/(.*)$': '<rootDir>/src/lib/$1',
		'^#root/(.*)$': '<rootDir>/src/$1'
	}
});
