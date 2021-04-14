import * as vscode from 'vscode';

import { Commands } from './commands';
import { Config } from './config';

import { FlowToTSRunner } from './flow-to-ts-runner';

export function activate(context: vscode.ExtensionContext): void {
  console.log(
    'Congratulations, your extension "flow-to-ts-vscode-runner" is now active!',
  );

  const config = new VSCodeConfig();

  const {
    convertDirectory,
    convertFile,
    generateTSDefForFile,
    generateFlowDefForFile,
  } = new Commands(config);

  new FlowToTSRunner(context)
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

class VSCodeConfig implements Config {
  public get flowToTsPath(): string {
    const value: string | undefined = vscode.workspace
      .getConfiguration()
      .get('flow-to-ts-runner.flow-to-tsPath');

    return value || './node_modules/.bin/flow-to-ts';
  }

  public get tscPath(): string {
    const value: string | undefined = vscode.workspace
      .getConfiguration()
      .get('flow-to-ts-runner.tscPath');

    return value || './node_modules/.bin/tsc';
  }

  public get flowgenPath(): string {
    const value: string | undefined = vscode.workspace
      .getConfiguration()
      .get('flow-to-ts-runner.flowgenPath');

    return value || './node_modules/.bin/flowgen';
  }
}
