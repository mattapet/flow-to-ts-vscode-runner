const PROJECT_PATH = __dirname;

module.exports = {
  projects: [
    {
      moduleFileExtensions: ['js', 'json', 'ts'],
      rootDir: PROJECT_PATH,
      transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
      },
      globals: {
        'ts-jest': {
          tsconfig: 'tsconfig.json',
        },
      },
      roots: ['<rootDir>/src'],
      testEnvironment: 'node',
      // displayName: 'unit',
      roots: ['<rootDir>/src'],
      testRegex: '\\.spec\\.ts$',
    },
  ],
};
