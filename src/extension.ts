import * as vscode from 'vscode';

import {
  convertDirectory,
  convertFile,
  generateTSDefForFile,
  generateFlowDefForFile,
} from './commands';

import { FlowToTSExtension } from './flow-to-ts-extension';

export function activate(context: vscode.ExtensionContext): void {
  console.log(
    'Congratulations, your extension "flow-to-ts-vscode-runner" is now active!',
  );

  new FlowToTSExtension(vscode.window, context)
    .registerFileTargetingCommand('extension.convertFlowFileToTs', convertFile)
    .registerFileTargetingCommand(
      'extension.generateTypescriptDefinitionsForFile',
      generateTSDefForFile,
    )
    .registerFileTargetingCommand(
      'extension.generateFlowDefinitionsForFile',
      generateFlowDefForFile,
    )
    .registerDirectoryTargetingCommand(
      'extension.convertFlowDirectoryToTs',
      convertDirectory,
    );
}
