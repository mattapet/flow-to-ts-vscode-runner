import * as vscode from 'vscode';

import {
  createConvertDirectoryCommand,
  createConvertFileCommand,
  createGenerateTSDefForFile,
} from './commands';

export function activate(context: vscode.ExtensionContext): void {
  console.log(
    'Congratulations, your extension "flow-to-ts-vscode-runner" is now active!',
  );

  let terminal: vscode.Terminal | undefined;

  async function executeTerminalCommand(createCommand: () => string) {
    const t = (terminal =
      terminal ?? vscode.window.createTerminal('flow-to-ts'));

    const { uri } = vscode.workspace.workspaceFolders![0];

    t.show();
    await vscode.commands.executeCommand('workbench.action.terminal.clear');
    t.sendText(`cd ${uri.path}`);
    try {
      t.sendText(createCommand());
    } catch (error) {
      vscode.window.showErrorMessage(error.message);
    }
  }

  const covertFileToTs = vscode.commands.registerCommand(
    'extension.convertFlowFileToTs',
    (target?: vscode.Uri) => {
      if (target) {
        const { path } = target;
        return executeTerminalCommand(() => createConvertFileCommand(path));
      }

      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const filePath = editor.document.fileName;
        return executeTerminalCommand(() => createConvertFileCommand(filePath));
      }

      vscode.window.showInformationMessage('No file to convert');
    },
  );

  const generateTypescriptDefinitionsForFile = vscode.commands.registerCommand(
    'extension.generateTypescriptDefinitionsForFile',
    (target?: vscode.Uri) => {
      if (target) {
        const { path } = target;
        return executeTerminalCommand(() => createGenerateTSDefForFile(path));
      }

      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const filePath = editor.document.fileName;
        return executeTerminalCommand(() =>
          createGenerateTSDefForFile(filePath),
        );
      }

      vscode.window.showInformationMessage('No file to convert');
    },
  );

  const covertDirectoryToTs = vscode.commands.registerCommand(
    'extension.convertFlowDirectoryToTs',
    (target: vscode.Uri) => {
      const { path } = target;
      executeTerminalCommand(() => createConvertDirectoryCommand(path));
    },
  );

  context.subscriptions.push(covertFileToTs);
  context.subscriptions.push(covertDirectoryToTs);
  context.subscriptions.push(generateTypescriptDefinitionsForFile);

  vscode.window.onDidCloseTerminal(() => {
    terminal = undefined;
  });
}
