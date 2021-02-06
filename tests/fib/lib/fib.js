// @flow

export function fib(n: number): number {
  const loop = (n: number, a: number, b: number): number =>
    n < 2 ? a : loop(n - 1, b, a + b);
  return loop(n, 0, 1);
}
