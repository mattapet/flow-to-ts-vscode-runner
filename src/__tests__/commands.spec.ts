import {
  createConvertFileCommand,
  createConvertDirectoryCommand,
} from '../commands';

describe('commands', () => {
  describe('convert file', () => {
    it('should use local flow-to-ts to convert single js file', () => {
      const fileName = 'sample-flow-file.js';

      const result = createConvertFileCommand(fileName);

      expect(result).toEqual(
        'node ./node_modules/.bin/flow-to-ts --write --prettier sample-flow-file.js -o ts',
      );
    });

    it('should throw error when the file is not .js file', () => {
      const fileName = 'sample-typescript-file.ts';

      const fn = () => createConvertFileCommand(fileName);

      expect(fn).toThrow(
        new Error(`Cannot convert non-flow file 'sample-typescript-file.ts'`),
      );
    });
  });

  describe('directory conversion', () => {
    it('should use local flow-to-ts to convert .js files in the given directory', () => {
      const directoryName = 'some-dir-filled-with-flow-files';

      const result = createConvertDirectoryCommand(directoryName);

      expect(result).toEqual(
        `find 'some-dir-filled-with-flow-files' -type f -name '*.js' | xargs node ./node_modules/.bin/flow-to-ts --write --prettier -o ts`,
      );
    });
  });
});
