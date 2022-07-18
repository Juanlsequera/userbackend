/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
// eslint-disable-next-line no-undef
/// Added settings for test and to ignore files in test coverage
module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.debug.json',
    },
  },
  testEnvironment: 'node',
  testPathIgnorePatterns: ['./dist'],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 20,
      lines: 60,
      //statements: -30,
    },
  },
};
