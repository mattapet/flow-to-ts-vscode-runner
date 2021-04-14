import { CommandWriter } from './command-writer';
import { FileTarget } from './target';
import { Config } from '../config';

export class Algebra {
  public readonly shell: Shell;
  public readonly flowToTs: FlowToTs;
  public readonly tsc: Tsc;
  public readonly flowgen: Flowgen;

  public constructor(config: Config) {
    this.shell = new Shell();
    this.flowToTs = new FlowToTs(config);
    this.tsc = new Tsc(config);
    this.flowgen = new Flowgen(config);
  }
}

export class Shell {
  public removeFile = (target: FileTarget): CommandWriter =>
    new CommandWriter(() => `rm -f '${target}'`);

  public rename = (from: FileTarget, to: FileTarget): CommandWriter =>
    new CommandWriter(() => `mv '${from}' '${to}'`);

  public findAll = (dir: string, pattern: string): CommandWriter =>
    new CommandWriter(() => `find '${dir}' -type f -name '${pattern}'`);
}

export class FlowToTs {
  public constructor(private readonly config: Config) {}

  private get bin(): string {
    return this.config.flowToTsPath;
  }

  public convert = (): CommandWriter =>
    new CommandWriter(() => `node '${this.bin}' --write --prettier -o ts`);

  public convertFile = (target: FileTarget): CommandWriter =>
    new CommandWriter(
      () => `node '${this.bin}' --write --prettier '${target}' -o ts`,
    );

  public convertFileTo = (
    target: FileTarget,
    output: FileTarget,
  ): CommandWriter =>
    new CommandWriter(
      () => `node '${this.bin}' --prettier '${target}' -o ts > '${output}'`,
    );
}

export class Tsc {
  public constructor(private readonly config: Config) {}

  private get bin(): string {
    return this.config.tscPath;
  }

  public emitDeclarations = (target: FileTarget): CommandWriter =>
    new CommandWriter(
      () =>
        `node '${this.bin}' '${target}' --declaration --emitDeclarationOnly`,
    );
}

export class Flowgen {
  public constructor(private readonly config: Config) {}

  private get bin(): string {
    return this.config.flowgenPath;
  }

  public emitDeclarations = (
    target: FileTarget,
    to: FileTarget,
  ): CommandWriter =>
    new CommandWriter(
      () => `node '${this.bin}' '${target}' --add-flow-header -o '${to}'`,
    );
}
