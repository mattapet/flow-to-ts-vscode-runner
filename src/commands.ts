export function createConvertFileCommand(filePath: string): string {
  if (!/.*\.js$/.test(filePath)) {
    throw new Error(`Cannot convert non-flow file '${filePath}'`);
  }

  return `node ./node_modules/.bin/flow-to-ts --write --prettier ${filePath} -o ts`;
}

export function createConvertDirectoryCommand(directoryPath: string): string {
  return `find '${directoryPath}' -type f -name '*.js' | xargs node ./node_modules/.bin/flow-to-ts --write --prettier -o ts`;
}
