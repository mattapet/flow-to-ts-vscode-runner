// @flow

export function factorize(n: number): number[] {
  const result = [];
  for (let divisor = 2; n > 1; divisor += 1)
    for (; n % divisor === 0; n /= divisor) {
      result.push(divisor);
    }
  return result;
}
