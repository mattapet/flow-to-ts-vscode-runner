# flow-to-ts-vscode-runner

A simple Visual Studio Code extension for running already existing [CLI tools](#cli-tools-integrated) for migrating Flow to Typescript right from the editor.

## CLI Tools Integrated

- [`flow-to-ts`](https://www.npmjs.com/package/@khanacademy/flow-to-ts)
- [`flowgen`](https://www.npmjs.com/package/flowgen)
- [`typescript`](https://www.npmjs.com/package/typescript)

## Features

### Converting files

Converts a single file from Flow to Typescript.

**Requirements:**

- `@khanacademy/flow-to-ts`

![Convert Flow file to Typescript](public/convert-file.gif)

### Converting directories

Converts all within the specified directory Flow files from Flow to Typescript recursively.

**Requirements:**

- `@khanacademy/flow-to-ts`

![Convert Directory file to Typescript](public/convert-directory.gif)

### Generating Typescript definitions from Flow

Generates Typescript definitions (`.d.ts`) for a given flow file.

**Requirements:**

- `@khanacademy/flow-to-ts`
- Typescript compiler (`tsc`)

![Generate Typescript definitions from Flow](public/generate-dts.gif)

### Generating Flow definitions from Typescript

Generates Flow definitions (`.js.flow`) for Typescript (`.ts`), or Typescript definition (`.d.ts`) file.

**Requirements:**

- `flowgen`

![Generate Flow definitions from Typescript](public/generate-flow-defs.gif)

## Extension settings

| Key | Description |
|---- | ---------- |
| `flow-to-ts-runner.tscPath` | Path to the Typescript compiler binary (e.g., `/usr/local/bin/tsc`). Defaults to local, i.e., `./node_modules/.bin/tsc` |
| `flow-to-ts-runner.flow-to-tsPath` | Path to the `@khanacademy/flow-to-ts` binary (e.g., `/usr/local/bin/flow-to-ts`). Defaults to local, i.e., `./node_modules/.bin/flow-to-ts` |
| `flow-to-ts-runner.flowgenPath` | Path to the `flowgen` binary (e.g., `/usr/local/bin/flowgen`). Defaults to local, i.e., `./node_modules/.bin/flowgen` |
