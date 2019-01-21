export default function joinDecimalString(base, decimal) {
  if (decimal) {
    return `${base}.${decimal}`;
  }
  return base;
}
