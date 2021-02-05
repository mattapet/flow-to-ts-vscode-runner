// @flow

import { fib } from './lib/fib';

function main(args: string[]): void {
  console.log(fib(parseInt(args[0], 10)));
}

main(process.argv.slice(2));
