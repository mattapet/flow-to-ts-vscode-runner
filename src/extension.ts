import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext): void {
  console.log(
    'Congratulations, your extension "flow-to-ts-vscode-runner" is now active!',
  );

  const covertFileToTs = vscode.commands.registerCommand(
    'extension.convertFlowFileToTs',
    (target?: any) => {
      if (target) {
        const { path } = target;
        return vscode.window.showInformationMessage(`Convert file '${path}'`);
      }

      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const filePath = editor.document.fileName;
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
      vscode.window.showInformationMessage(`Convert directory '${path}'`);
    },
  );

  context.subscriptions.push(covertFileToTs);
  context.subscriptions.push(covertDirectoryToTs);
}
