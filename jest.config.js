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
      roots: ['<rootDir>/src', '<rootDir>/tests'],
      testEnvironment: 'node',
      testRegex: '\\.spec\\.ts$',
    },
  ],
};
