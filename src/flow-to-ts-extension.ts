import * as vscode from 'vscode';
import { Command } from './commands';

export class FlowToTSExtension {
  private terminal?: vscode.Terminal;

  public constructor(private readonly context: vscode.ExtensionContext) {
    vscode.window.onDidCloseTerminal(() => {
      this.terminal = undefined;
    });
  }

  public registerFileTargetingCommand(name: string, cmd: Command): this {
    const disposable = this.registerCommand(name, cmd, this.getTargetFilePath);
    this.context.subscriptions.push(disposable);
    return this;
  }

  public registerDirectoryTargetingCommand(name: string, cmd: Command): this {
    const disposable = this.registerCommand(name, cmd, this.getTargetDirPath);
    this.context.subscriptions.push(disposable);
    return this;
  }

  private registerCommand(
    name: string,
    cmd: Command,
    targetExtractor: (target?: vscode.Uri) => string | undefined,
  ): vscode.Disposable {
    return vscode.commands.registerCommand(
      name,
      async (target?: vscode.Uri) => {
        const targetPath = targetExtractor(target);
        if (!targetPath) {
          return vscode.window.showInformationMessage('No target to convert');
        }

        try {
          await this.executeCommand(cmd(targetPath).run());
        } catch (error) {
          vscode.window.showErrorMessage(error.message);
        }
      },
    );
  }

  private async executeCommand(cmd: string): Promise<void> {
    const t = (this.terminal =
      this.terminal ?? vscode.window.createTerminal('flow-to-ts'));

    const { uri } = vscode.workspace.workspaceFolders![0];

    t.show();
    await vscode.commands.executeCommand('workbench.action.terminal.clear');
    t.sendText(`cd '${uri.path}'`);
    t.sendText(cmd);
  }

  private getTargetFilePath(target?: vscode.Uri): string | undefined {
    return target?.path ?? vscode.window.activeTextEditor?.document.fileName;
  }

  private getTargetDirPath(target?: vscode.Uri): string | undefined {
    return target?.path;
  }
}
