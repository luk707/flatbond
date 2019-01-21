import takeRight from "lodash/takeRight";

export default function chunkRight(values, chunkSize) {
  const buffer = [...values];
  const result = [];
  while (buffer.length > chunkSize) {
    result.push(takeRight(buffer, chunkSize));
    buffer.splice(-chunkSize, chunkSize);
  }
  result.push(buffer);
  result.reverse();
  return result;
}
