import { CommandWriter } from './bin-utils';
import { FileTarget } from './target';

class Shell {
  public removeFile = (target: FileTarget): CommandWriter =>
    new CommandWriter(() => `rm -f ${target}`);

  public rename = (from: FileTarget, to: FileTarget): CommandWriter =>
    new CommandWriter(() => `mv ${from} ${to}`);

  public findAll = (dir: string, pattern: string): CommandWriter =>
    new CommandWriter(() => `find ${dir} -type f -name '${pattern}'`);
}

class FlowToTs {
  public constructor(private readonly bin: string) {}

  public convert = (): CommandWriter =>
    new CommandWriter(() => `node ${this.bin} --write --prettier -o ts`);

  public convertFile = (target: FileTarget): CommandWriter =>
    new CommandWriter(
      () => `node ${this.bin} --write --prettier '${target}' -o ts`,
    );

  public convertFileTo = (
    target: FileTarget,
    output: FileTarget,
  ): CommandWriter =>
    new CommandWriter(
      () => `node ${this.bin} --prettier -o '${target}' ts > ${output}`,
    );
}

class Tsc {
  public constructor(private readonly bin: string) {}

  public emitTSDeclarations = (target: FileTarget): CommandWriter =>
    new CommandWriter(
      () => `node ${this.bin} ${target} --declaration --emitDeclarationOnly`,
    );
}

class Flowgen {
  public constructor(private readonly bin: string) {}

  public emitFlowDeclarations = (target: FileTarget): CommandWriter =>
    new CommandWriter(
      () => `node ${this.bin} '${target}' --add-flow-header -o '${target}'`,
    );
}
