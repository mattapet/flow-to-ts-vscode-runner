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
  if (!/.*\.ts$/.test(filePath)) {
    throw new Error(`Cannot convert non-typescript file '${filePath}'`);
  }
  executeCommand(
    `./node_modules/.bin/tsc '${filePath}' --declaration --emitDeclarationOnly`,
  );
};

export const convertDirectory: Command = (executeCommand) => (
  directoryPath,
) => {
  executeCommand(
    `find '${directoryPath}' -type f -name '*.js' | xargs node ./node_modules/.bin/flow-to-ts --write --prettier -o ts`,
  );
};
