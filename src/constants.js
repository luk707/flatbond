export default {
  currencyScalarConfig: {
    unit: "£",
    comma: true,
    decimals: 2,
    display: ({ value, unit }) => `${unit}${value}`
  }
};
