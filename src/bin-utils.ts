export class CommandWriter {
  public constructor(readonly run: () => string) {}

  public andThen(next: CommandWriter): CommandWriter {
    return new CommandWriter(() => this.run() + ' && ' + next.run());
  }

  public pipeTo(next: CommandWriter): CommandWriter {
    return new CommandWriter(() => this.run() + ' | ' + next.run());
  }

  public pipeAsArgsTo(next: CommandWriter): CommandWriter {
    return new CommandWriter(() => this.run() + ' | xargs ' + next.run());
  }
}
