/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: "node",
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**/*.spec.ts', '**/*.test.ts'], // Asegúrate de que los tests sean detectados.
  clearMocks: true,
};


/* transform: {
  "^.+.tsx?$": ["ts-jest",{}],
}, */