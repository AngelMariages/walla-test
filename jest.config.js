// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require('next/jest')

const createJestConfig = nextJest({
	dir: './',
})

/** @type {import('jest').Config} */
const customJestConfig = {
	// setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	moduleDirectories: ['node_modules', '<rootDir>/'],
	testEnvironment: 'jest-environment-jsdom',
};

const jestConfig = async () => {
	const nextJestConfig = await createJestConfig(customJestConfig)()

	return {
		...nextJestConfig,
		moduleNameMapper: {
			"\\.svg": "<rootDir>/.jest/svgMock.js",
			...nextJestConfig.moduleNameMapper,
		},
	};
}

module.exports = jestConfig();