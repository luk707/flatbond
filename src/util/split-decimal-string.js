export default function splitDecimalString(numberString) {
  const [base, fraction] = numberString.split(".");
  return [base || "0", fraction || ""];
}
