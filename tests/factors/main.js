// @flow

import { factorize } from './factorize';

async function main(args: string[]) {
  console.log(factorize(parseInt(args[0], 10)).join(', '));
}

main(process.argv.slice(2));
