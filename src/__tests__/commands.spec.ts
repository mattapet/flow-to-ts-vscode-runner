import {
  createConvertFileCommand,
  createConvertDirectoryCommand,
  createGenerateTSDefForFile,
} from '../commands';

describe('commands', () => {
  describe('convert file', () => {
    it('should use local flow-to-ts to convert single js file', () => {
      const fileName = 'sample-flow-file.js';

      const result = createConvertFileCommand(fileName);

      expect(result).toEqual(
        `node ./node_modules/.bin/flow-to-ts --write --prettier 'sample-flow-file.js' -o ts`,
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

  describe('generating definitions', () => {
    it('should create command using local tsc to generate .d.ts for the given file', () => {
      const fileName = 'some-ts-file.ts';

      const result = createGenerateTSDefForFile(fileName);

      expect(result).toEqual(
        `./node_modules/.bin/tsc 'some-ts-file.ts' --declaration --emitDeclarationOnly`,
      );
    });

    it('should throw an error if the given files is not a typescript file', () => {
      const fileName = 'some-flow-file.js';

      const fn = () => createGenerateTSDefForFile(fileName);

      expect(fn).toThrowError(
        new Error(`Cannot convert non-typescript file 'some-flow-file.js'`),
      );
    });
  });
});
