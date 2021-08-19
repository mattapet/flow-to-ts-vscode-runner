import * as path from 'path';

export class FileTarget {
  private readonly ext: string;
  private readonly sourceName: string;
  private readonly fileDirectory: string;

  public constructor(targetPath: string) {
    const extRegexp = /\.([^\.]+)$/;
    this.ext = targetPath.match(extRegexp)![1];
    this.sourceName = path.basename(targetPath).replace(extRegexp, '');
    this.fileDirectory = path.dirname(targetPath);
  }

  public get isFlowFile(): boolean {
    return this.ext === 'js' || this.ext === 'jsx';
  }

  public get isNotFlowFile(): boolean {
    return !this.isFlowFile;
  }

  public get isTSFile(): boolean {
    return this.ext === 'ts';
  }

  public get isNotTSFile(): boolean {
    return !this.isTSFile;
  }

  public hidden(): FileTarget {
    return new FileTarget(
      `${this.fileDirectory}/.${this.sourceName}.${this.ext}`,
    );
  }

  public ts(): FileTarget {
    return new FileTarget(`${this.fileDirectory}/${this.sourceName}.ts`);
  }

  public dts(): FileTarget {
    return new FileTarget(`${this.fileDirectory}/${this.sourceName}.d.ts`);
  }

  public js(): FileTarget {
    return new FileTarget(`${this.fileDirectory}/${this.sourceName}.js`);
  }

  public jsFlow(): FileTarget {
    return new FileTarget(`${this.fileDirectory}/${this.sourceName}.js.flow`);
  }

  public toString(): string {
    return `${this.fileDirectory}/${this.sourceName}.${this.ext}`;
  }
}
