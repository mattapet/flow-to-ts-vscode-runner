import { CommandWriter } from './command-writer';
import { Algebra } from './algebra';
import { FileTarget } from './target';

import { Config } from '../config';

export type Command = (path: string) => CommandWriter;

export class Commands {
  private readonly F: Algebra;

  public constructor(config: Config) {
    this.F = new Algebra(config);
  }

  convertFile: Command = filePath => {
    const target = new FileTarget(filePath);
    if (target.isNotFlowFile) {
      throw new Error(`Cannot convert non-flow file '${filePath}'`);
    }

    return this.F.flowToTs.convertFile(target);
  };

  generateTSDefForFile: Command = filePath => {
    const target = new FileTarget(filePath);
    if (target.isNotFlowFile) {
      throw new Error(`Cannot convert non-flow file '${filePath}'`);
    }

    return this.F.flowToTs
      .convertFileTo(target, target.hidden().ts())
      .andThen(this.F.tsc.emitDeclarations(target.hidden().ts()))
      .andThen(this.F.shell.removeFile(target.hidden().ts()))
      .andThen(this.F.shell.rename(target.hidden().dts(), target.dts()));
  };

  generateFlowDefForFile: Command = filePath => {
    const target = new FileTarget(filePath);
    if (target.isNotTSFile) {
      throw new Error(
        `Cannot generate Flow definitions from non-typescript file '${filePath}'`,
      );
    }

    return this.F.flowgen.emitDeclarations(target, target.jsFlow());
  };

  convertDirectory: Command = directoryPath => {
    return this.F.shell
      .findAll(directoryPath, '*.js', '*.jsx')
      .pipeAsArgsTo(this.F.flowToTs.convert());
  };
}
