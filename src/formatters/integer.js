import curry from "lodash/curry";
import chunkRight from "../util/chunk-right";
import splitDecimalString from "../util/split-decimal-string";

export default function integer(
  { comma = false, chunkSize = 3, seperator = "," } = {},
  value
) {
  // Round the number to an integer
  const base = Math.round(value).toFixed(0);
  // If comma is specified use chunk right split the number
  if (comma) {
    return chunkRight(base.split(""), 3)
      .map(chunk => chunk.join(""))
      .join(seperator);
  }
  // Otherwise just return it
  return base.toString();
}
