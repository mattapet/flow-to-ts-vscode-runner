import { FileTarget } from './target';

export type CommandExecutor = (command: string) => void;
export type Command = (ex: CommandExecutor) => (path: string) => void;

export const convertFile: Command = (executeCommand) => (filePath) => {
  const target = new FileTarget(filePath);
  if (target.isNotFlowFile) {
    throw new Error(`Cannot convert non-flow file '${filePath}'`);
  }

  executeCommand(
    `node ./node_modules/.bin/flow-to-ts --write --prettier '${target}' -o ts`,
  );
};

export const generateTSDefForFile: Command = (executeCommand) => (filePath) => {
  const target = new FileTarget(filePath);
  if (target.isNotFlowFile) {
    throw new Error(`Cannot convert non-flow file '${filePath}'`);
  }

  executeCommand(
    `node ./node_modules/.bin/flow-to-ts --prettier '${target}' -o ts > '${target
      .hidden()
      .ts()}' && ` +
      `node ./node_modules/.bin/tsc '${target
        .hidden()
        .ts()}' --declaration --emitDeclarationOnly && ` +
      `rm -f '${target.hidden().ts()}' && ` +
      `mv '${target.hidden().dts()}' '${target.dts()}'`,
  );
};

export const generateFlowDefForFile: Command = (executeCommand) => (
  filePath,
) => {
  const target = new FileTarget(filePath);
  if (target.isNotTSFile) {
    throw new Error(
      `Cannot generate Flow definitions from non-typescript file '${filePath}'`,
    );
  }

  executeCommand(
    `node ./node_modules/.bin/flowgen '${target}' --add-flow-header -o '${target.jsFlow()}'`,
  );
};

export const convertDirectory: Command = (executeCommand) => (
  directoryPath,
) => {
  executeCommand(
    `find '${directoryPath}' -type f -name '*.js' | xargs node ./node_modules/.bin/flow-to-ts --write --prettier -o ts`,
  );
};
