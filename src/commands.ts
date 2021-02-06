import * as path from 'path';

export type CommandExecutor = (command: string) => void;
export type Command = (ex: CommandExecutor) => (path: string) => void;

export const convertFile: Command = (executeCommand) => (filePath) => {
  if (!/.*\.js$/.test(filePath)) {
    throw new Error(`Cannot convert non-flow file '${filePath}'`);
  }

  executeCommand(
    `node ./node_modules/.bin/flow-to-ts --write --prettier '${filePath}' -o ts`,
  );
};

export const generateTSDefForFile: Command = (executeCommand) => (filePath) => {
  if (!/.*\.js$/.test(filePath)) {
    throw new Error(`Cannot convert non-flow file '${filePath}'`);
  }
  const sourceName = path.basename(filePath).replace(/\.js$/, '');
  const fileDirectory = path.dirname(filePath);

  executeCommand(
    `node ./node_modules/.bin/flow-to-ts --prettier '${filePath}' -o ts > '${fileDirectory}/.${sourceName}.ts' && ` +
      `node ./node_modules/.bin/tsc '${fileDirectory}/.${sourceName}.ts' --declaration --emitDeclarationOnly && ` +
      `rm -f '${fileDirectory}/.${sourceName}.ts' && ` +
      `mv '${fileDirectory}/.${sourceName}.d.ts' '${fileDirectory}/${sourceName}.d.ts'`,
  );
};

export const generateFlowDefForFile: Command = (executeCommand) => (
  filePath,
) => {
  if (!/.*\.ts$/.test(filePath)) {
    throw new Error(
      `Cannot generate Flow definitions from non-typescript file '${filePath}'`,
    );
  }
  const sourceName = path.basename(filePath).replace(/\.ts$/, '');
  const fileDirectory = path.dirname(filePath);

  executeCommand(
    `node ./node_modules/.bin/flowgen '${filePath}' --add-flow-header -o '${fileDirectory}/${sourceName}.js.flow'`,
  );
};

export const convertDirectory: Command = (executeCommand) => (
  directoryPath,
) => {
  executeCommand(
    `find '${directoryPath}' -type f -name '*.js' | xargs node ./node_modules/.bin/flow-to-ts --write --prettier -o ts`,
  );
};
