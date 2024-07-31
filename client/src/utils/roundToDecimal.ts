export function roundToDecimal(number: number) {
  // rounds to 2 decimal places
  return Math.round((number + Number.EPSILON) * 100) / 100;
}
