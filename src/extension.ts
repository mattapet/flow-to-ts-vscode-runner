import * as vscode from 'vscode';

import {
  convertDirectory,
  convertFile,
  generateTSDefForFile,
  generateFlowDefForFile,
  Command,
} from './commands';

export function activate(context: vscode.ExtensionContext): void {
  console.log(
    'Congratulations, your extension "flow-to-ts-vscode-runner" is now active!',
  );

  let terminal: vscode.Terminal | undefined;

  const covertFileToTs = registerFileTargetingCommand(
    'extension.convertFlowFileToTs',
    convertFile,
  );

  const generateTypescriptDefinitionsForFile = registerFileTargetingCommand(
    'extension.generateTypescriptDefinitionsForFile',
    generateTSDefForFile,
  );

  const generateFlowDefinitionsForFile = registerFileTargetingCommand(
    'extension.generateFlowDefinitionsForFile',
    generateFlowDefForFile,
  );

  const covertDirectoryToTs = registerDirectoryTargetingCommand(
    'extension.convertFlowDirectoryToTs',
    convertDirectory,
  );

  context.subscriptions.push(covertFileToTs);
  context.subscriptions.push(covertDirectoryToTs);
  context.subscriptions.push(generateTypescriptDefinitionsForFile);
  context.subscriptions.push(generateFlowDefinitionsForFile);

  vscode.window.onDidCloseTerminal(() => {
    terminal = undefined;
  });

  // - utilities

  function registerFileTargetingCommand(
    name: string,
    cmd: Command,
  ): vscode.Disposable {
    return vscode.commands.registerCommand(
      name,
      async (target?: vscode.Uri) => {
        const filePath = getTargetFilePath(target);
        if (!filePath) {
          return vscode.window.showInformationMessage('No target to convert');
        }

        try {
          cmd(await getCommandExecution())(filePath);
        } catch (error) {
          vscode.window.showErrorMessage(error.message);
        }
      },
    );
  }

  function registerDirectoryTargetingCommand(
    name: string,
    cmd: Command,
  ): vscode.Disposable {
    return vscode.commands.registerCommand(
      name,
      async (target?: vscode.Uri) => {
        const directoryPath = getTargetDirPath(target);
        if (!directoryPath) {
          return vscode.window.showInformationMessage('No target to convert');
        }

        try {
          cmd(await getCommandExecution())(directoryPath);
        } catch (error) {
          vscode.window.showErrorMessage(error.message);
        }
      },
    );
  }

  async function getCommandExecution(): Promise<(cmd: string) => void> {
    const t = (terminal =
      terminal ?? vscode.window.createTerminal('flow-to-ts'));

    const { uri } = vscode.workspace.workspaceFolders![0];

    t.show();
    await vscode.commands.executeCommand('workbench.action.terminal.clear');
    t.sendText(`cd ${uri.path}`);

    return (cmd) => t.sendText(cmd);
  }

  function getTargetFilePath(target?: vscode.Uri): string | undefined {
    return target?.path ?? vscode.window.activeTextEditor?.document.fileName;
  }

  function getTargetDirPath(target?: vscode.Uri): string | undefined {
    return target?.path;
  }
}
