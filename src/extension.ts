import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext): void {
  console.log(
    'Congratulations, your extension "flow-to-ts-vscode-runner" is now active!',
  );

  let terminal: vscode.Terminal | undefined;

  async function convertFile(filePath: string) {
    const t = (terminal =
      terminal ?? vscode.window.createTerminal('flow-to-ts'));

    t.show();
    await vscode.commands.executeCommand('workbench.action.terminal.clear');
    t.sendText(`cat ${filePath}`);
  }

  async function convertDirectory(filePath: string) {
    const t = (terminal =
      terminal ?? vscode.window.createTerminal('flow-to-ts'));

    t.show();
    await vscode.commands.executeCommand('workbench.action.terminal.clear');
    t.sendText(`find ${filePath} -type f -name '*.js'`);
  }

  const covertFileToTs = vscode.commands.registerCommand(
    'extension.convertFlowFileToTs',
    (target?: any) => {
      if (target) {
        const { path } = target;
        convertFile(path);
        return vscode.window.showInformationMessage(`Convert file '${path}'`);
      }

      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const filePath = editor.document.fileName;
        convertFile(filePath);
        return vscode.window.showInformationMessage(
          `You're in file '${filePath}'`,
        );
      }

      vscode.window.showInformationMessage('No file to convert');
    },
  );

  const covertDirectoryToTs = vscode.commands.registerCommand(
    'extension.convertFlowDirectoryToTs',
    (target: any) => {
      const { path } = target;
      convertDirectory(path);
      vscode.window.showInformationMessage(`Convert directory '${path}'`);
    },
  );

  context.subscriptions.push(covertFileToTs);
  context.subscriptions.push(covertDirectoryToTs);

  vscode.window.onDidCloseTerminal(() => {
    terminal = undefined;
  });
}
