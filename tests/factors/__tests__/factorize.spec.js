// @flow

import { factorize } from '../factorize';

describe('factorization', () => {
  it.each`
    input                               | factors
    ${1}                                | ${[]}
    ${2}                                | ${[2]}
    ${3}                                | ${[3]}
    ${4}                                | ${[2, 2]}
    ${5}                                | ${[5]}
    ${6}                                | ${[2, 3]}
    ${7}                                | ${[7]}
    ${8}                                | ${[2, 2, 2]}
    ${9}                                | ${[3, 3]}
    ${2 * 2 * 3 * 5 * 7 * 11 * 13 * 13} | ${[2, 2, 3, 5, 7, 11, 13, 13]}
  `(`should factorize $input into $factors`, ({ input, factors }: any) => {
    expect(factorize(input)).toEqual(factors);
  });
});
