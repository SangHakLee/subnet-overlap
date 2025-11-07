/** @type {import('jest').Config} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	roots: ['<rootDir>/test'],
	testMatch: ['**/*.test.ts'],
	testPathIgnorePatterns: ['/node_modules/'],
	collectCoverageFrom: [
		'src/**/*.ts',
		'index.ts',
		'!**/*.d.ts',
		'!**/node_modules/**'
	],
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 85,
			lines: 85,
			statements: 85
		}
	},
	transform: {
		'^.+\\.ts$': ['ts-jest', {
			tsconfig: 'tsconfig.test.json'
		}]
	},
	// Puppeteer test timeout
	testTimeout: 30000,
	// Display individual test results
	verbose: true
}
