export function createConvertFileCommand(filePath: string): string {
  if (!/.*\.js$/.test(filePath)) {
    throw new Error(`Cannot convert non-flow file '${filePath}'`);
  }

  return `node ./node_modules/.bin/flow-to-ts --write --prettier '${filePath}' -o ts`;
}

export function createGenerateTSDefForFile(filePath: string): string {
  if (!/.*\.ts$/.test(filePath)) {
    throw new Error(`Cannot convert non-typescript file '${filePath}'`);
  }
  return `./node_modules/.bin/tsc '${filePath}' --declaration --emitDeclarationOnly`;
}

export function createConvertDirectoryCommand(directoryPath: string): string {
  return `find '${directoryPath}' -type f -name '*.js' | xargs node ./node_modules/.bin/flow-to-ts --write --prettier -o ts`;
}
