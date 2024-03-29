import { Commands } from '..';

describe('commands', () => {
  const {
    convertDirectory,
    convertFile,
    generateTSDefForFile,
    generateFlowDefForFile,
  } = new Commands({
    flowToTsPath: './node_modules/.bin/flow-to-ts',
    flowgenPath: './node_modules/.bin/flowgen',
    tscPath: './node_modules/.bin/tsc',
  });

  describe('convert file', () => {
    it('should use local flow-to-ts to convert single js file', () => {
      const fileName = 'sample-flow-file.js';

      const result = convertFile(fileName).run();

      expect(result).toBe(
        `node './node_modules/.bin/flow-to-ts' --write --prettier './sample-flow-file.js' -o ts`,
      );
    });

    it('should throw error when the file is not .js file', () => {
      const fileName = 'sample-typescript-file.ts';

      const fn = () => convertFile(fileName);

      expect(fn).toThrow(
        new Error(`Cannot convert non-flow file 'sample-typescript-file.ts'`),
      );
    });
  });

  describe('directory conversion', () => {
    it('should use local flow-to-ts to convert .js files in the given directory', () => {
      const directoryName = 'some-dir-filled-with-flow-files';

      const result = convertDirectory(directoryName).run();

      expect(result).toBe(
        `find 'some-dir-filled-with-flow-files' -type f \\( -name '*.js' -o -name '*.jsx' \\) | xargs node './node_modules/.bin/flow-to-ts' --write --prettier -o ts`,
      );
    });
  });

  describe('generating flow definitions', () => {
    it('should create command using local flow-to-ts and tsc to generate .d.ts for the given file', () => {
      const fileName = 'path/to/file/some-flow-file.js';

      const result = generateTSDefForFile(fileName).run();

      expect(result).toBe(
        `node './node_modules/.bin/flow-to-ts' --prettier 'path/to/file/some-flow-file.js' -o ts > 'path/to/file/.some-flow-file.ts' && ` +
          `node './node_modules/.bin/tsc' 'path/to/file/.some-flow-file.ts' --declaration --emitDeclarationOnly && ` +
          `rm -f 'path/to/file/.some-flow-file.ts' && ` +
          `mv 'path/to/file/.some-flow-file.d.ts' 'path/to/file/some-flow-file.d.ts'`,
      );
    });

    it('should throw an error if the given file is not a flow file', () => {
      const fileName = 'some-flow-file.ts';

      const fn = () => generateTSDefForFile(fileName);

      expect(fn).toThrowError(
        new Error(`Cannot convert non-flow file 'some-flow-file.ts'`),
      );
    });
  });

  describe('generating typescript definitions', () => {
    it('should create command using local flowgen to generate .js.flow for the given file', () => {
      const fileName = 'path/to/file/some-typescript-file.ts';

      const result = generateFlowDefForFile(fileName).run();

      expect(result).toBe(
        `node './node_modules/.bin/flowgen' 'path/to/file/some-typescript-file.ts' --add-flow-header -o 'path/to/file/some-typescript-file.js.flow'`,
      );
    });

    it('should throw an error if the given file is not a typescript file', () => {
      const fileName = 'path/to/some-flow-file.js';

      const fn = () => generateFlowDefForFile(fileName);

      expect(fn).toThrowError(
        new Error(
          `Cannot generate Flow definitions from non-typescript file 'path/to/some-flow-file.js'`,
        ),
      );
    });
  });
});
